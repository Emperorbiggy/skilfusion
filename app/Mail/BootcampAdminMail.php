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
        return $this->subject('New Bootcamp Registration: ' . $this->registration->student_id)
                    ->to('skilfusionuniversity@gmail.com')
                    ->view('emails.bootcamp_admin');
    }
}