<?php

namespace App\Mail;

use App\Models\BootcampRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UIUXAdmissionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;
    public $whatsappLink = 'https://chat.whatsapp.com/BKzeNmSMtdN8obeblzLiHn?mode=ac_t';

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

        return $this->subject('Congratulations you\'re in! SFA UI/UX Design Bootcamp Admission Details')
                    ->view('emails.admission_ui_ux')
                    ->with([
                        'fullName' => $fullName,
                        'whatsappLink' => $this->whatsappLink
                    ]);
    }
}