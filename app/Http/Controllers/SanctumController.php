<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SanctumController extends Controller
{
  public function create(Request $request)
  {
    $token = $request->user()->createToken($request->token_name);
    return Inertia::flash('tokener', $token->plainTextToken)->back();
  }

  public function deleteAll()
  {
    // if (auth('sanctum')->check()) {
    //   Auth::user()->tokens()->delete();
    //   return Inertia::flash('toast', [
    //     'type' => 'success',
    //     'message' => 'Tokens successfully deleted'
    //   ])->back();
    // }
    return Inertia::flash('toast', [
      'type' => 'error',
      'message' => 'No tokens available to delete'
    ])->back();
  }
}
