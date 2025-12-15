<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
  return Inertia::render('welcome');
})->name('home');
// Route::get('/', [PostController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
    return Inertia::render('dashboard');
  })->name('dashboard');
  Route::get('testpage', function () {
    // $myImage = Storage::disk('r2')->get('strange_cube.jpg');
    $test = Storage::disk('r2')->url('strange_cube.jpg');
    // $myBMW = env('CLOUDFLARE_R2_URL') . '/2005-BMW-M3-GTR-Need-For-Speed-001-1080.jpg';
    // $myImage64 = base64_encode($myImage);
    $myVideo = Storage::disk('r2')->url('retrowave (720p_25fps_H264-128kbit_AAC).mp4');
    return Inertia::render('admin/TestPage', [
      // 'myImage' => 'data:image/jpeg;base64,' . $myImage64,
      'myImage' => $test,
      'myVideo' => $myVideo,
    ]);
  })->name('testpage');
});

Route::resource('blog', PostController::class);
Route::resource('cate', CategoryController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
