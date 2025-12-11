<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CommunityPost extends Model
{
    use HasFactory;

    protected $fillable = ['registration_id','course_id','session_id','title','content'];

    public function student() { return $this->belongsTo(BootcampRegistration::class,'registration_id'); }
    public function course() { return $this->belongsTo(Course::class); }
    public function session() { return $this->belongsTo(CourseSession::class,'session_id'); }
}
