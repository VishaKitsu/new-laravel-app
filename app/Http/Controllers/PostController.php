<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
    $r2url = env('CLOUDFLARE_R2_URL');
    return Inertia::render('Blog', ['posts' => $posts, 'r2url' => $r2url]);
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
    Post::create($validated);

    return back()->with('success', 'Post created successfully');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $post = Post::with(['category', 'user'])->where('slug', $id)->firstOrFail();
    $post['url'] = Storage::disk('r2')->url($post['thumbnail']);
    // $r2url = env('CLOUDFLARE_R2_URL');

    return Inertia::render('Blog/BlogShow', ['post' => $post]);
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
    $path = $post->thumbnail;
    $post->delete();
    if ($path) {
      Storage::disk('r2')->delete($path);
    }

    return back()->with('success', "Post successfully deleted.");
  }
}
