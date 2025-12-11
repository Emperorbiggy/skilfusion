<?php

namespace App\Http\Controllers;

use App\Models\BootcampRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\UIUXAdmissionMail;
use App\Mail\WebDevAdmissionMail;
use App\Mail\BootcampAdminMail;
use App\Mail\BootcampUserMail; 
use Illuminate\Support\Facades\Log;

class BootcampRegistrationController extends Controller
{
    public function register(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'email' => 'required|email|unique:bootcamp_registrations,email',
            'country' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'whatsapp' => 'required|string|max:20',
            'course' => 'required|in:web-development,ui-ux',
            'agreeTerms' => 'accepted'
        ]);

        // Generate student ID
        $studentId = $this->generateStudentId();
        $password = $studentId; // Password same as student ID

        // Create registration
        $registration = BootcampRegistration::create([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'middle_name' => $validated['middleName'] ?? null,
            'email' => $validated['email'],
            'country' => $validated['country'],
            'state' => $validated['state'],
            'city' => $validated['city'],
            'phone' => $validated['phone'],
            'whatsapp' => $validated['whatsapp'],
            'course' => $validated['course'],
            'student_id' => $studentId,
            'admission_email_sent' => false, // Track if email has been sent
        ]);

        // Send all emails immediately
        $this->sendAllEmails($registration);

        return response()->json([
            'success' => true,
            'student_id' => $studentId,
            'password' => $password, // Return password (same as student ID)
            'registration' => $registration
        ]);
    }

    private function generateStudentId()
    {
        $year = now()->format('Y');
        $prefix = "SFA-{$year}-";

        // Get last ID for current year
        $lastId = BootcampRegistration::where('student_id', 'like', "{$prefix}%")
            ->orderBy('id', 'desc')
            ->value('student_id');

        // Extract sequence number
        $sequence = $lastId ? (int)substr($lastId, strrpos($lastId, '-') + 1) + 1 : 1;

        return $prefix . str_pad($sequence, 4, '0', STR_PAD_LEFT);
    }

    // Send all required emails
    private function sendAllEmails(BootcampRegistration $registration)
    {
        $password = $registration->student_id; // Password same as student ID
        
        try {
            // 1. Send course-specific admission email
            if ($registration->course === 'ui-ux') {
                Mail::to($registration->email)->send(
                    new UIUXAdmissionMail($registration)
                );
            } else {
                Mail::to($registration->email)->send(
                    new WebDevAdmissionMail($registration)
                );
            }
            
            // 2. Send admin notification
            Mail::to('skillfusionuniversity@gmail.com')->send(
                new BootcampAdminMail($registration)
            );
            
            // 3. Send welcome email with credentials
            Mail::to($registration->email)->send(
                new BootcampUserMail($registration, $registration->student_id, $password)
            );
            
            // Mark admission email as sent
            $registration->admission_email_sent = true;
            $registration->save();
            
        } catch (\Exception $e) {
            Log::error('Email sending failed: ' . $e->getMessage());
        }
    }

    // Bulk email sending function
    public function sendBulkAdmissionEmails()
{
    // Increase execution time limit
    set_time_limit(600); // 10 minutes

    // Get registrations count for progress tracking
    $totalRegistrations = BootcampRegistration::where('admission_email_sent', false)->count();
    $processed = 0;
    $sentCount = 0;
    $failedCount = 0;

    // Process in chunks to reduce memory usage
    BootcampRegistration::where('admission_email_sent', false)
        ->chunkById(100, function ($registrations) use (&$sentCount, &$failedCount, &$processed, $totalRegistrations) {
            foreach ($registrations as $registration) {
                try {
                    $this->sendAllEmails($registration);
                    $sentCount++;
                } catch (\Exception $e) {
                    Log::error("Failed to send emails to {$registration->email}: " . $e->getMessage());
                    $failedCount++;
                }
                $processed++;
                
                // Optional: Log progress
                if ($processed % 50 === 0) {
                    Log::info("Bulk email progress: $processed/$totalRegistrations");
                }
            }
        });

    return response()->json([
        'success' => true,
        'message' => "Bulk emails sent successfully. Total: $totalRegistrations, Sent: $sentCount, Failed: $failedCount",
        'total' => $totalRegistrations,
        'sent_count' => $sentCount,
        'failed_count' => $failedCount
    ]);
}
}