<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bio extends Model
{
    protected $fillable = [
        'user_id',
        'greeting',
        'title',
        'description',
        'avatar',
        'cta_btn_title',
        'cta_btn_url',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
