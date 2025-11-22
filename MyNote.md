# Table of Content
- [Table of Content](#table-of-content)
  - [How to use route() in Laravel](#how-to-use-route-in-laravel)
  - [How to use zod](#how-to-use-zod)
  - [Website to practice css flex box and grid](#website-to-practice-css-flex-box-and-grid)
  - [Useful artisan commands](#useful-artisan-commands)

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
3. 