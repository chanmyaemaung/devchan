<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('excerpt')->nullable();
            $table->longText('body')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->string('slug')->unique();
            $table->string('thumbnail')->nullable();
            $table->integer('views')->default(0);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->dateTime('published_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
