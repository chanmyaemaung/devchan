<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('greeting_title')->nullable();
            $table->string('main_title')->nullable();
            $table->string('sub_title')->nullable();
            $table->string('hero_cta_text')->nullable();
            $table->string('hero_cta_link')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('tech_stack_title')->nullable();
            $table->string('tech_stack_sub_title')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
