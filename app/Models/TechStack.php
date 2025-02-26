<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TechStack extends Model
{
    protected $fillable = ['name'];

    public function technologies(): HasMany
    {
        return $this->hasMany(Technology::class);
    }
}
