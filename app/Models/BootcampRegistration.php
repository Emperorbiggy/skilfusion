<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BootcampRegistration extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'country',
        'state',
        'city',
        'phone',
        'whatsapp',
        'course',
        'student_id',
        'password', 
        'admission_email_sent'
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'admission_email_sent' => 'boolean'
    ];

    // JWT methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'student_id' => $this->student_id,
            'email' => $this->email,
            'name' => $this->first_name . ' ' . $this->last_name,
        ];
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    // Relationships to direct tables
    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'registration_id');
    }

    public function resources()
    {
        return $this->hasMany(Resource::class, 'registration_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'registration_id');
    }

    public function communityPosts()
    {
        return $this->hasMany(CommunityPost::class, 'registration_id');
    }

    // Many-to-Many with CourseSession
    public function sessions()
    {
        return $this->belongsToMany(
            CourseSession::class,
            'course_session_student', // pivot table
            'student_id',
            'session_id'
        )->withTimestamps();
    }

    // Courses via sessions
    public function courses()
    {
        return $this->belongsToMany(
            Course::class,
            'course_session_student',
            'student_id',
            'session_id'
        )->using(CourseSession::class)
         ->withTimestamps();
    }
}
