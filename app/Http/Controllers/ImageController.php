<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
  public function store(Request $request)
  {
    $request->validate([
      'file' => 'required|image|max:2048',
    ]);

    $file = $request->file('file');
    $path = 'blog-images/' . uniqid() . '.' . $file->getClientOriginalExtension();

    // Upload to R2
    Storage::disk('r2')->put($path, $file->get());
    
    // $path = $request->file('file')->store('blog-images', 'r2');

    Image::create([
      'post_id' => null,
      'user_id' => Auth::id(),
      'path' => $path,
    ]);

    $url = Storage::url($path);

    return response()->json(['location' => $url]);
  }
  public function destroyLeftover()
  {
    $images = Image::whereNull('post_id')->where('user_id', Auth::id())->get();
    foreach ($images as $image){
      Storage::disk('r2')->delete($image->path);
      $image->delete();
    }
    return response()->json(['status' => 'cleaned']);
  }
}
