<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            // Remove the old foreign key
            $table->dropForeign(['post_id']);

            // Add it back with cascade delete
            $table->foreign('post_id')
                  ->references('id')
                  ->on('posts')
                  ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            // Remove cascade rule
            $table->dropForeign(['post_id']);

            // Restore original foreign key (no cascade)
            $table->foreign('post_id')
                  ->references('id')
                  ->on('posts');
        });
    }
};
