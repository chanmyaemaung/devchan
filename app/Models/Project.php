<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'thumbnail',
        'url',
        'is_featured',
        'year',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }


    /**
     * Boot the model.
     *
     * Automatically generates and updates the slug when the name is modified.
     * This ensures that:
     * - Each project has a URL-friendly slug
     * - Slug stays in sync with the name
     * - Works for both creation and updates
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($project) {
            if ($project->isDirty('name')) {
                $project->slug = Str::slug($project->name);
            }
        });
    }
}
