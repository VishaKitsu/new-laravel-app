<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $posts = Post::with(['category', 'user'])->get();
    return Inertia::render('Blog', ['posts' => $posts]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $categories = Category::all();
    return Inertia::render('admin/CreatePost', ['categories' => $categories]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'category_id' => 'required|exists:categories,id',
      'thumbnail' => 'required|image',
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'content' => 'required|string',
    ]);
    
    $validated['user_id'] = Auth::id();
    $validated['slug'] = Post::generateUniqueSlug($validated['title']);

    // ---------- Upload to R2 ----------
    if ($request->hasFile('thumbnail')) {
        // Generate unique file name
        $file = $request->file('thumbnail');
        $path = 'thumbnails/' . uniqid() . '.' . $file->getClientOriginalExtension();

        // Upload to R2
        Storage::disk('r2')->put($path, $file->get());

        // Save path in DB
        $validated['thumbnail'] = $path;
    }

    $post = Post::create($validated);
    Image::where('post_id', null)
      ->where('user_id', Auth::id())
      ->update(['post_id' => $post->id]);

    return back()->with('success', 'Post created successfully');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $slug)
  {
    $post = Post::with(['category', 'user'])->where('slug', $slug)->firstOrFail();
    $comments = Comment::where('post_id', $post->id)->latest()->get();
    // $post['url'] = Storage::url($post['thumbnail']);
    // $r2url = env('CLOUDFLARE_R2_URL');

    return Inertia::render('Blog/BlogShow', ['post' => $post, 'comments' => $comments]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
      //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
      //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $post = Post::findOrFail($id);
    $thumbnailPath = $post->thumbnail;
    $images = Image::where("post_id", $id)->get();
    if ($thumbnailPath) {
      Storage::disk('r2')->delete($thumbnailPath);
    }
    foreach ($images as $image) {
      Storage::disk('r2')->delete($image->path);
    }

    $post->delete();

    return back()->with('success', "Post successfully deleted.");
  }
}
