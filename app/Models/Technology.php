<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Technology extends Model
{
    protected $fillable = ['tech_stack_id', 'name', 'icon', 'url'];

    public function techStack(): BelongsTo
    {
        return $this->belongsTo(TechStack::class);
    }
}
