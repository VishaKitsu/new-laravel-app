<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
  public function store(Request $request)
  {
    $request->validate([
      'file' => 'required|image|max:2048',
    ]);
    
    $path = $request->file('file')->store('blog-images');

    Image::create([
      'post_id' => null,
      'user_id' => Auth::id(),
      'path' => $path,
    ]);

    return response()->json([
      'location' => Storage::url($path),
    ]);
  }
}
