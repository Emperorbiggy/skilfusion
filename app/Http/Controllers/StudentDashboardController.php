<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\BootcampRegistration;
use Carbon\Carbon;

class StudentDashboardController extends Controller
{
    /**
     * Fetch dashboard data using JWT token (no middleware call needed)
     */
    public function getDashboardData(Request $request)
    {
        // Authenticate user from JWT
        $student = JWTAuth::parseToken()->authenticate();

        // Fetch bootcamp registration using student_id
        $registration = BootcampRegistration::with(['assignments', 'sessions'])
            ->where('student_id', $student->student_id)
            ->firstOrFail();

        // Total classes and completed classes
        $totalClasses = $registration->sessions->count();
        $classesTaken = $registration->sessions->where('pivot.completed', true)->count();

        // Assignments mapping
        $assignments = $registration->assignments->map(function ($a) {
            return [
                'id' => $a->id,
                'title' => $a->title,
                'course' => $a->course_name ?? 'N/A',
                'dueDate' =>$a->due_date ->format('M d, Y'),
                'status' => $a->submitted ? 'submitted' : 'pending',
                'score' => $a->score,
                'maxScore' => $a->max_score,
            ];
        });

        // Sessions mapping (renamed course_id → session_id)
       $sessions = $registration->sessions->map(function ($s) {
    return [
        'session_id' => $s->id,
        'name' => $s->name,
        'startDate' => $s->start_date ? Carbon::parse($s->start_date)->format('M d, Y') : null,
        'endDate'   => $s->end_date ? Carbon::parse($s->end_date)->format('M d, Y') : null,
        'completed' => $s->pivot->completed ?? false,
    ];
});
        return response()->json([
            'student_id' => $registration->student_id,
            'email' => $registration->email,
            'first_name' => $registration->first_name,
            'middle_name' => $registration->middle_name,
            'last_name' => $registration->last_name,
            'phone' => $registration->phone,
            'whatsapp' => $registration->whatsapp,
            'city' => $registration->city,
            'state' => $registration->state,
            'country' => $registration->country,
            'admission_email_sent' => $registration->admission_email_sent,
            'course' => $registration->course,
            'startDate' => optional($registration->created_at)->format('M d, Y'),
            'totalClasses' => $totalClasses,
            'classesTaken' => $classesTaken,
            'assignments' => $assignments,
            'sessions' => $sessions,
        ]);
    }
}
