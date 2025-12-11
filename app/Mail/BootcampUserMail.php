<?php

namespace App\Mail;

use App\Models\BootcampRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BootcampUserMail extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;
    public $studentId;
    public $password;

    public function __construct(BootcampRegistration $registration, $studentId, $password)
    {
        $this->registration = $registration;
        $this->studentId = $studentId;
        $this->password = $password;
    }

    public function build()
    {
        $courseName = $this->registration->course === 'web-development' 
            ? 'Web Development' 
            : 'UI/UX Design';

        return $this->subject('Welcome to Skill Fusion Academy!')
                    ->view('emails.bootcamp_user')
                    ->with([
                        'courseName' => $courseName
                    ]);
    }
}