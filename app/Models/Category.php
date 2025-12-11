<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'name', 'description'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function communityPosts()
    {
        return $this->hasMany(CommunityPost::class);
    }
}
