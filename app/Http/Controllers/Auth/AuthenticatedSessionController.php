<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\BootcampRegistration;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
   public function store(Request $request): JsonResponse
{
    $request->validate([
        'studentId' => 'required|string',
        'password' => 'required|string',
    ]);

    $studentId = $request->input('studentId');
    $password = $request->input('password');

    $student = BootcampRegistration::where('student_id', $studentId)->first();

    if (!$student) {
        return response()->json(['message' => 'Invalid student ID'], 401);
    }

    // 🚨 If user enters studentId as password
    if ($studentId === $password) {
        // If they already set a password, don’t allow this anymore
        if (!is_null($student->password)) {
            return response()->json([
                'message' => 'You already set a password, please login with it.'
            ], 403);
        }

        // First-time login
        $token = JWTAuth::fromUser($student);
        return response()->json([
            'message' => 'Login successful! Please set your password.',
            'first_login' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'student' => [
                'id' => $student->id,
                'student_id' => $student->student_id,
                'name' => $student->first_name . ' ' . $student->last_name,
                'email' => $student->email,
            ],
        ]);
    }

    // 🚨 Normal password login
    if (!$student->password || !Hash::check($password, $student->password)) {
        return response()->json(['message' => 'Invalid password'], 401);
    }

    $token = JWTAuth::fromUser($student);

    return response()->json([
        'message' => 'Login successful!',
        'first_login' => false,
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => config('jwt.ttl') * 60,
        'student' => [
            'id' => $student->id,
            'student_id' => $student->student_id,
            'name' => $student->first_name . ' ' . $student->last_name,
            'email' => $student->email,
        ],
    ]);
}


    /**
     * Handle password reset.
     */
    public function resetPassword(Request $request): JsonResponse
{
    $request->validate([
        'studentId' => 'required|string',
        'newPassword' => 'required|string|min:8',
        'confirmPassword' => 'required|string|same:newPassword',
    ]);

    $studentId = $request->input('studentId');
    $newPassword = $request->input('newPassword');

    \Log::info('Password reset request received', [
        'studentId' => $studentId,
        'newPassword_plain' => $newPassword,
    ]);

    $student = BootcampRegistration::where('student_id', $studentId)->first();

    if (!$student) {
        return response()->json(['message' => 'Invalid student ID'], 401);
    }

    // ✅ Let the model mutator hash it
    $student->password = $newPassword;
    $student->save();

    $token = JWTAuth::fromUser($student);

    \Log::info('Password reset successful', ['studentId' => $studentId]);

    return response()->json([
        'message' => 'Password updated successfully!',
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => config('jwt.ttl') * 60,
        'student' => [
            'id' => $student->id,
            'student_id' => $student->student_id,
            'name' => $student->first_name . ' ' . $student->last_name,
            'email' => $student->email,
        ],
    ]);
}


    public function refresh(): JsonResponse
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();
            return response()->json([
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Token expired or invalid, please log in again.',
            ], 401);
        }
    }

    public function me(): JsonResponse
    {
        return response()->json(auth()->user());
    }

    public function destroy(Request $request): JsonResponse
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logged out successfully!']);
    }
}
