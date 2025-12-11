<?php

namespace App\Mail;

use App\Models\BootcampRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WebDevAdmissionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;
    public $whatsappLink = 'https://chat.whatsapp.com/KCJMDinTBvH5NnOn9a409u?mode=ac_t';

    public function __construct(BootcampRegistration $registration)
    {
        $this->registration = $registration;
    }

    public function build()
    {
        $fullName = $this->registration->first_name;
        if ($this->registration->middle_name) {
            $fullName .= ' ' . $this->registration->middle_name;
        }
        $fullName .= ' ' . $this->registration->last_name;

        return $this->subject('Congratulations you\'re in! SFA Web Development Bootcamp Admission Details')
                    ->view('emails.admission_web_dev')
                    ->with([
                        'fullName' => $fullName,
                        'whatsappLink' => $this->whatsappLink
                    ]);
    }
}