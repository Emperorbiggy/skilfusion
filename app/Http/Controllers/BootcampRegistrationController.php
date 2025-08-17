<?php

namespace App\Http\Controllers;

use App\Models\BootcampRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\BootcampUserMail;
use App\Mail\BootcampAdminMail;
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
        ]);

        // Send emails
        try {
            // Email to user
            Mail::to($registration->email)->send(
                new BootcampUserMail($registration, $studentId, $password)
            );
            
            // Email to admin
            Mail::to('skillfusionuniversity@gmail.com')->send(
                new BootcampAdminMail($registration)
            );
            
        } catch (\Exception $e) {
            Log::error('Email sending error: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'student_id' => $studentId,
            'password' => $password,
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
}