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
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $posts = Post::select([
      'id', 
      'user_id', 
      'category_id', 
      'thumbnail', 
      'title', 
      'description', 
      'created_at',
      'slug',
    ])->with(['category', 'user'])->get();
    if (Auth::user()){
      return Inertia::render('Blog/Index', ['posts' => $posts]);
    }
    return Inertia::render('Blog/Guest/GuestIndex', ['posts' => $posts]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $categories = Category::all();
    return Inertia::render('Blog/Create', ['categories' => $categories]);
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
        Storage::put($path, $file->get());

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
    $comments = Comment::with(['user'])->where('post_id', $post->id)->latest()->get();
    // $post['url'] = Storage::url($post['thumbnail']);
    // $r2url = env('CLOUDFLARE_R2_URL');
    if (Auth::user()){
      return Inertia::render('Blog/Show', ['post' => $post, 'comments' => $comments, 'currentUser'=> Auth::user()->name]);
    }

    return Inertia::render('Blog/Guest/GuestShow', ['post' => $post, 'comments' => $comments]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    $post = Post::with(['category', 'user'])->findOrFail($id);
    $categories = Category::all();
    return Inertia::render('Blog/Edit', ['post' => $post, 'categories' => $categories]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $post = Post::findOrFail($id);
    abort_if($post->user_id !== Auth::id(), 403);

    $validated = $request->validate([
      'category_id' => 'required|exists:categories,id',
      'thumbnail' => 'nullable|image',
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'content' => 'required|string',
    ]);

    if ($validated['title'] !== $post->title){
      $validated['slug'] = Post::generateUniqueSlug($validated['title']);
    }

    DB::transaction(function () use ($request, $post, $validated, $id) {
      // ---------- Upload to R2 ----------
      if ($request->hasFile('thumbnail')) {
        // Generate unique file name
        $file = $request->file('thumbnail');
        $path = 'thumbnails/' . uniqid() . '.' . $file->getClientOriginalExtension();

        // Delete old thumbnail
        if ($post->thumbnail) {
          Storage::delete($post->thumbnail);
        }

        // Upload to R2
        Storage::put($path, $file->get());

        // Save path in DB
        $validated['thumbnail'] = $path;
      }

      $post->update($validated);

      Image::where('post_id', null)
        ->where('user_id', Auth::id())
        ->update(['post_id' => $id]);
    });

    return Inertia::flash('flashMessage', 'Post successfully updated')->back();
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

    // return back()->with('success', "Post successfully deleted.");
    return Inertia::flash('flashMessage', "Post successfully deleted.")->back();
  }
}
