<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Setting extends Model
{
    protected $fillable = [
        'greeting_title',
        'main_title',
        'sub_title',
        'hero_cta_text',
        'hero_cta_link',
        'hero_image',
        'tech_stack_title',
        'tech_stack_sub_title',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
