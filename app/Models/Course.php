<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function sessions()
    {
        return $this->hasMany(CourseSession::class);
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
    public function categories()
{
    return $this->hasMany(Category::class);
}

}
