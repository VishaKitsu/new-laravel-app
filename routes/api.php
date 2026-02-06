<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('/admin/migrate', function () {
    Artisan::call('migrate', [
        '--force' => true, // REQUIRED outside CLI
    ]);

    return nl2br(Artisan::output());
});

Route::get('/admin/migrate-rollback', function () {
    Artisan::call('migrate:rollback', ['--force' => true,]);

    return nl2br(Artisan::output());
});

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/tokening', function(): JsonResponse {
    $data = "hey hey hey from api";
    return response()->json($data);
  });
});