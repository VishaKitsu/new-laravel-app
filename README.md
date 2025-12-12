# What to do after cloning a laravel react project
## Install PHP dependencies
Make sure you have PHP, Composer, and extensions required by Laravel.

    composer install
## Install Javascript dependencies
    npm install
## Create the .env file
the best way is to copy paste the .env file from original.
## Generate the application key
    php artisan key:generate

then paste the key in the .env file
## Run migration for database
    php artisan migrate

You should just copy paste from the original.
## Run it
If you use herd, just run
```bash
npm run dev
```
