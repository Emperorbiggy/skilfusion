<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BootcampRegistration extends Model
{
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
        'student_id'
    ];
}