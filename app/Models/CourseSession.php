<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseSession extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'name', 'start_date', 'end_date'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function students()
    {
        return $this->belongsToMany(
            BootcampRegistration::class,
            'course_session_student',
            'session_id',
            'student_id'
        )->withTimestamps();
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'session_id');
    }

    public function resources()
    {
        return $this->hasMany(Resource::class, 'session_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'session_id');
    }

    public function communityPosts()
    {
        return $this->hasMany(CommunityPost::class, 'session_id');
    }
}
