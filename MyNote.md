# Table of Content
- [Table of Content](#table-of-content)
  - [How to use route() in Laravel](#how-to-use-route-in-laravel)
  - [How to use zod](#how-to-use-zod)
  - [Website to practice css flex box and grid](#website-to-practice-css-flex-box-and-grid)
  - [Useful artisan commands](#useful-artisan-commands)
  - [What to do after cloning a laravel react project](#what-to-do-after-cloning-a-laravel-react-project)
    - [Install PHP dependencies](#install-php-dependencies)
    - [Install Javascript dependencies](#install-javascript-dependencies)
    - [Create the .env file](#create-the-env-file)
    - [Generate the application key](#generate-the-application-key)
    - [Run migration for database](#run-migration-for-database)
    - [Run it](#run-it)
  - [About Model accessor](#about-model-accessor)
  - [About Inertia's manual visit and manual form submissions](#about-inertias-manual-visit-and-manual-form-submissions)
    - [With Wayfinder](#with-wayfinder)
  - [How to share development site with Laravel expose (might not work)](#how-to-share-development-site-with-laravel-expose-might-not-work)
    - [Get Expose token](#get-expose-token)
    - [Run the command](#run-the-command)
  - [How to enable API in laravel](#how-to-enable-api-in-laravel)
  - [How to disable csrf protection for a route](#how-to-disable-csrf-protection-for-a-route)
  - [How to deploy laravel project to InfinityFree (similar to namecheap)](#how-to-deploy-laravel-project-to-infinityfree-similar-to-namecheap)
    - [Pre-Deployment (Local Machine)](#pre-deployment-local-machine)
    - [Public folder configuration](#public-folder-configuration)
    - [Run migration for database](#run-migration-for-database-1)

## How to use route() in Laravel

1. Install php ziggy

```composer require tightenco/ziggy```

2. Install ziggy js

```npm install ziggy-js```

3. Configure vite config

in vite.config.ts file add resolve for ziggy:

```ts
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
      alias: {
        'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
      },
    },
});
```

3. Configure directive

In app.blade.php template, add @routes directive in `<head>`:

```php
<head>
  ...

  @routes
  @viteReactRefresh
  @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
  @inertiaHead
</head>
```

4. Global route import

In `*projectfolder*/resources/js/types` folder, create `global.d.ts` file and write:

```ts
import type { route as routeFn } from 'ziggy-js';

declare global {
  const route: typeof routeFn;
}
```


## How to use zod
```ts
import {z} from "zod";

// define a schema
const User = z.object({
  username: z.string(),
});

// parsing
User.parse("tuna"); // => "tuna"
User.parse(12); // throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
User.safeParse("tuna"); // => { success: true; data: "tuna" }
User.safeParse(12); // => { success: false; data: ZodError }

// extract the inferred type
type User = z.infer<typeof User>;
// you get { username: string }
```

## Website to practice css flex box and grid
1. For flexbox: `https://flexboxfroggy.com/`
2. For grid: `https://cssgridgarden.com/`

## Useful artisan commands
1. To check all the routes: `php artisan route:list`
2. To create a new controller: `php artisan make:controller ExampleController` <br>or with CRUD methods built-in: `php artisan make:controller ExampleController --resource`
3. To create a new Model: `php artisan make:model Model` the Model name must match a table's singular name like posts table => Post (model name)
4. To create a new migration file: `php artisan make:migration create_[table name with plural]_table` the table name must be plural.

## What to do after cloning a laravel react project
### Install PHP dependencies
Make sure you have PHP, Composer, and extensions required by Laravel.

    composer install
### Install Javascript dependencies
    npm install
### Create the .env file
the best way is to copy paste the .env file from original.
### Generate the application key
    php artisan key:generate

then paste the key in the .env file
### Run migration for database
    php artisan migrate

You should just copy paste from the original.
### Run it
If you use herd, just run
```bash
npm run dev
```

## About Model accessor
A Laravel model accessor is **a method used to transform an Eloquent attribute's value when it is retrieved from the model**. They allow you to present a formatted value without changing the underlying data in the database. 
For example, you could use an accessor to combine a user's `first_name` and `last_name` into a single `full_name` attribute.
<br> for example:

```php
//accessor for thumbnail_url
// Add 'thumbnail_url' to JSON/array responses
protected $appends = ['thumbnail_url'];
// Define the accessor
protected function thumbnailUrl(): Attribute
{
  return Attribute::get(
    fn () => $this->thumbnail 
      ? Storage::url($this->thumbnail)
      : null
  );
}
```

The method name `thumbnailUrl()` is what binds it to `thumbnail_url` 

```php
// Modern way - using Attribute class
protected function firstName(): Attribute
{
    return Attribute::make(
        get: fn ($value) => ucfirst($value),
        set: fn ($value) => strtolower($value),
    );
}

// Shorthand syntax (Laravel 9+)
protected function lastName(): Attribute
{
    return new Attribute(
        get: fn ($value) => strtoupper($value),
    );
}
```

## About Inertia's manual visit and manual form submissions

it’s also possible to manually make Inertia visits / requests programmatically via JavaScript. This is accomplished via the `router.visit()` method.

```tsx
import { router } from '@inertiajs/react'

router.visit(url, {
    method: 'get',
    data: {},
    replace: false,
    preserveState: false,
    preserveScroll: false,
    only: [],
    except: [],
    headers: {},
    errorBag: null,
    forceFormData: false,
    queryStringArrayFormat: 'brackets',
    async: false,
    showProgress: true,
    fresh: false,
    reset: [],
    preserveUrl: false,
    prefetch: false,
    viewTransition: false,
    onCancelToken: cancelToken => {},
    onCancel: () => {},
    onBefore: visit => {},
    onStart: visit => {},
    onProgress: progress => {},
    onSuccess: page => {},
    onError: errors => {},
    onFinish: visit => {},
    onPrefetching: () => {},
    onPrefetched: () => {},
})
```

However, it’s generally more convenient to use one of Inertia’s shortcut request methods. These methods share all the same options as `router.visit()`.

```tsx
import { router } from '@inertiajs/react'

router.get(url, data, options)
router.post(url, data, options)
router.put(url, data, options)
router.patch(url, data, options)
router.delete(url, options)
router.reload(options) // Uses the current URL
```

### With Wayfinder
When using Wayfinder, you can pass the resulting object directly to any router method. The router will infer the HTTP method and URL from the Wayfinder object.

```tsx
import { router } from '@inertiajs/react'
import { show } from 'App/Http/Controllers/UserController'

router.visit(show(1))
router.post(store())
router.delete(destroy(1))
```

For convenience, the `get()`, `post()`, `put()`, and `patch()`methods all accept data as their second argument.

```tsx
import { router } from '@inertiajs/react'

router.post('/users', {
    name: 'John Doe',
    email: 'john.doe@example.com',
})
```

## How to share development site with Laravel expose (might not work)

### Get Expose token
by creating a expose account in their website
### Run the command
make sure the `npm run dev` is running and then in another command line run `herd share` or `expose share`. <br>
And then it will give you the public URL for your site. <br>
In the Vite config, write besides plugins. not in plugins:
```tsx
    server: {  
        cors: {  
            origin: [  
                'https://YOURPUBLICURL.sharedwithexpose.com',
                'https://new-laravel-app.test/' 
                // this will break the site for your original development site
            ],  
        },  
    },  
```
After that in .env file, comment out the APP_URL for later and write in `APP_URL=https://YOURPUBLICURL.sharedwithexpose.com/` and you're done!!

## How to enable API in laravel
create `api.php` in `routes` folder. Then in `bootstrap/app.php` add
```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',  //<---- add this here
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
```

## How to disable csrf protection for a route

In `bootstrap/app.php` write
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);
    $middleware->validateCsrfTokens(except: [  // add this code here
      'images/upload',                         // <-- this is the route you want to disable csrf protection
    ]);                                        //
```

## How to deploy laravel project to InfinityFree (similar to namecheap)
### Pre-Deployment (Local Machine)
* **Compile Frontend Assets**: Run `npm run build`. This generates the necessary JavaScript and CSS in your `public/build` directory.
* **Install PHP Dependencies**: Run `composer install --optimize-autoloader --no-dev`.
* **Clear cache**: Run `php artisan optimize:clear`
* **Modify .env file**: 
  * change `APP_ENV=local` to `APP_ENV=production`
  * change `APP_URL=https://yourwebsite.com` to your website you're about to deploy
  * create a database in infinityfree and add the database information in env
* **Runing php artisan manually**: Infinityfree doesn't have a terminal to run `php artisan` but you can bypass it by running manually in `web.php`. Just visit those routes and it will execute the code. example: 
```php
Route::get('/admin/view-clear', function () {
    Artisan::call('view:clear');
    return Artisan::output();
});

Route::get('/admin/optimize', function () {
    $output = [];

    Artisan::call('optimize:clear');
    $output[] = Artisan::output();

    Artisan::call('optimize');
    $output[] = Artisan::output();

    Artisan::call('view:cache');
    $output[] = Artisan::output();

    return implode("\n", $output);
});
// you have to write this code below in api.php to work
// Route::get('/admin/migrate', function () {
//    Artisan::call('migrate', [
//        '--force' => true, // REQUIRED outside CLI
//    ]);

//    return nl2br(Artisan::output());
// });
```
* **Zip the Project**: Compress your entire project directory into a `.zip` file, but exclude the `node_modules` folder to save space and time during upload. Then paste the zip and extract it in the `htdocs` folder.
### Public folder configuration
* Laravel have `index.php` inside the `public` folder, not the htdocs root folder and Infinityfree can't use it by default.
* You have to create a `.htaccess` file in the root and write
```
RewriteEngine On
RewriteRule (.*) /public/$1 [L]
```
now it works like a charm.
### Run migration for database
* After you write the `artisan migrate` in `api.php`, you have to go to `config/database.php` in the mysql part, change `'engine' => null,` to `'engine' => 'InnoDB',`.
* Go to `app/Providers/AppServiceProvider.php` and in the `boot()` function write `Schema::defaultStringLength(191);` because Infinityfree database is old and the string primary key take too much space.
* Then visit `/api/admin/migrate` to migrate the database.

ALL DONE