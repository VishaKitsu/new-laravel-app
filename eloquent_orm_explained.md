# 🧠 Laravel Eloquent ORM Explained

## What Is Eloquent ORM?

**Eloquent** is **Laravel’s built-in Object-Relational Mapper (ORM)** —  
a system that lets you interact with your **database using PHP objects**, not raw SQL.

> **ORM** = “Object-Relational Mapping”  
> It maps **database tables → PHP classes**, and **rows → objects**.

Instead of writing SQL like:
```sql
SELECT * FROM users WHERE id = 1;
```

You can simply write:
```php
$user = User::find(1);
```

and get a **`User` model object** representing that row in the `users` table.

---

## 🧩 How It Works

### 1️⃣ Each Table ↔ Model

Every database table typically has a matching **Eloquent Model**.

| Database Table | Model Class |
|----------------|--------------|
| `users` | `App\Models\User` |
| `posts` | `App\Models\Post` |
| `comments` | `App\Models\Comment` |

---

### 2️⃣ Each Row ↔ Object

Each record (row) in the table becomes an **object instance** of that model.

```php
$user = User::find(1);

echo $user->name;  // Access a column
$user->email = 'new@example.com';  
$user->save();     // Updates the row in database
```

You can **read, write, update, and delete** data using object-oriented syntax.

---

## ⚙️ Common Eloquent Methods

| Method | Description | Example |
|--------|--------------|----------|
| `all()` | Get all records | `User::all()` |
| `find($id)` | Find by primary key | `User::find(1)` |
| `where()` | Filter rows | `User::where('active', 1)->get()` |
| `first()` | Get the first matching row | `User::where('email', $email)->first()` |
| `create()` | Insert new record | `User::create(['name' => 'John', ...])` |
| `update()` | Update an existing record | `$user->update(['name' => 'Jane'])` |
| `delete()` | Delete the record | `$user->delete()` |

---

## 🪄 Example

Here’s a simple model:

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'body'];
}
```

You can then use it like this:

```php
// Create a post
$post = Post::create([
    'title' => 'Hello World',
    'body' => 'This is my first post.'
]);

// Read all posts
$posts = Post::all();

// Update a post
$post->title = 'Updated Title';
$post->save();

// Delete a post
$post->delete();
```

No SQL required — Eloquent handles everything.

---

## 🔗 Relationships

Eloquent makes it easy to define **relationships** between tables.

| Relationship | Example | Description |
|---------------|----------|-------------|
| One-to-One | `$user->profile` | A user has one profile |
| One-to-Many | `$user->posts` | A user has many posts |
| Many-to-Many | `$user->roles` | A user belongs to many roles |
| Has-Many-Through | `$country->posts` | A country has many posts through users |

Example:

```php
class User extends Model
{
    public function posts() {
        return $this->hasMany(Post::class);
    }
}

$user = User::find(1);
$posts = $user->posts; // returns a collection of Post objects
```

---

## ⚡ Why Developers Love Eloquent

✅ Clean and expressive syntax  
✅ Avoids repetitive SQL  
✅ Automatically guards against SQL injection  
✅ Built-in timestamps and soft deletes  
✅ Works great with factories, seeders, events, and observers  

---

## 🧩 Summary

| Concept | Description |
|----------|-------------|
| **Eloquent** | Laravel’s ORM (database ↔ object bridge) |
| **Model** | PHP class that represents a database table |
| **Row** | Object instance of a model |
| **Relationships** | Easy linking between tables |
| **Goal** | Write less SQL, more expressive PHP |
