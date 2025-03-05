<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'excerpt',
        'body',
        'status',
        'slug',
        'thumbnail',
        'views',
        'meta_title',
        'meta_description',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Scope a query to only include published posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Get formatted published date.
     *
     * @return string|null
     */
    public function getPublishedDateAttribute(): ?string
    {
        return $this->published_at ? $this->published_at->format('F j, Y') : null;
    }

    /**
     * Get estimated reading time in minutes based on word count.
     *
     * Assumes average reading speed of 200 words per minute.
     * Returns at least 1 minute even for very short content.
     *
     * @return int The estimated reading time in minutes
     */
    public function getReadingTimeAttribute(): int
    {
        $body = $this->body ?? '';
        $words = str_word_count(strip_tags($body));
        return max(1, ceil($words / 200));
    }

    // Get posts by category
    public function scopeInCategory($query, $categoryId)
    {
        return $query->whereHas('categories', function ($q) use ($categoryId) {
            $q->where('categories.id', $categoryId);
        });
    }

    /**
     * Increment the view count for this post.
     *
     * @param bool $isAdminView Whether this view is from the admin panel
     * @return void
     */
    public function incrementViews(bool $isAdminView = false): void
    {
        // Option 1: Count all views regardless of source
        $this->increment('views');

        // Option 2: Track admin views separately (if you want this in the future)
        // if (!$isAdminView) {
        //     $this->increment('views');
        // }
        // You could also add a separate admin_views column if needed
    }

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($post) {
            if ($post->isDirty('title')) {
                $slug = Str::slug($post->title);

                // Check for uniqueness
                $count = static::where('slug', $slug)
                    ->where('id', '!=', $post->id)
                    ->count();

                $post->slug = $count ? "{$slug}-{$count}" : $slug;
            }
        });
    }
}
