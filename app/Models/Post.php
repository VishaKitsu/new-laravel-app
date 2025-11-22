<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Support\Str;

class Post extends Model
{
  //
  protected $fillable = [
    'user_id',
    'category_id',
    'thumbnail',
    'title',
    'description',
    'slug',
  ];

  public function category()
  {
    return $this->belongsTo(Category::class);
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public static function generateUniqueSlug($title)
  {
    $slug = Str::slug($title);
    $originalSlug = $slug;

    $count = 2;

    While(Post::where('slug', $slug)->exists())
    {
      $slug = $originalSlug . '-' . $count;
      $count++;
    }

    return $slug;
  }
}
