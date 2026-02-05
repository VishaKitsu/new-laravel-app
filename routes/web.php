<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

// Route::get('/', function () {
//   return Inertia::render('welcome');
// })->name('home');


Route::get('/homer', function () {
  return Inertia::render('Homer');
})->name('test');
Route::get('/', [PostController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
    $postCount = Post::count();
    $userCount = User::count();
    return Inertia::render('Dashboard', ['postCount' => $postCount, 'userCount' => $userCount]);
  })->name('dashboard');
  Route::get('testpage', function () {
    // $myImage = Storage::disk('r2')->get('strange_cube.jpg');
    $test = Storage::url('strange_cube.jpg');
    // $myBMW = env('CLOUDFLARE_R2_URL') . '/2005-BMW-M3-GTR-Need-For-Speed-001-1080.jpg';
    // $myImage64 = base64_encode($myImage);
    $myVideo = Storage::url('retrowave (720p_25fps_H264-128kbit_AAC).mp4');
    return Inertia::render('admin/TestPage', [
      // 'myImage' => 'data:image/jpeg;base64,' . $myImage64,
      'myImage' => $test,
      'myVideo' => $myVideo,
    ]);
  })->name('testpage');
});

Route::resource('blog', PostController::class)->except(['index']);
Route::resource('cate', CategoryController::class);
Route::resource('comment', CommentController::class);
Route::post('/images/upload', [ImageController::class, 'store']);

Route::get('/admin/view-clear', function () {
    Artisan::call('view:clear');
    return Artisan::output();
})->name('artisan.viewclear');

Route::get('/admin/optimize', function () {
    $output = [];

    Artisan::call('optimize:clear');
    $output[] = Artisan::output();

    Artisan::call('optimize');
    $output[] = Artisan::output();

    Artisan::call('view:cache');
    $output[] = Artisan::output();

    return implode("\n", $output);
})->name('artisan.optimize');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
