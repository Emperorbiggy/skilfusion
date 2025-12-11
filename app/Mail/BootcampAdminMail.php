<?php

namespace App\Mail;

use App\Models\BootcampRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BootcampAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;

    public function __construct(BootcampRegistration $registration)
    {
        $this->registration = $registration;
    }

    public function build()
    {
        $courseName = $this->registration->course === 'web-development' 
            ? 'Web Development' 
            : 'UI/UX Design';
            
        $fullName = $this->registration->first_name . ' ' . $this->registration->last_name;
        if ($this->registration->middle_name) {
            $fullName = $this->registration->first_name . ' ' . $this->registration->middle_name . ' ' . $this->registration->last_name;
        }

        return $this->subject('New Bootcamp Registration: ' . $this->registration->student_id)
                    ->view('emails.bootcamp_admin')
                    ->with([
                        'courseName' => $courseName,
                        'fullName' => $fullName
                    ]);
    }
}