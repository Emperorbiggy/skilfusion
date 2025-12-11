<?php
use App\Http\Controllers\BootcampRegistrationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\StudentDashboardController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register-bootcamp', [BootcampRegistrationController::class, 'register']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/refresh', [AuthenticatedSessionController::class, 'refresh']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('/reset', [AuthenticatedSessionController::class, 'resetPassword']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::get('/me', [AuthenticatedSessionController::class, 'me']);
    Route::get('/dashboard', [StudentDashboardController::class, 'getDashboardData']);

    // Admin
    Route::get('/admin/send-admission-emails',
        [BootcampRegistrationController::class, 'sendBulkAdmissionEmails']);
    
    // Add other protected API routes here
    // Example:
    // Route::get('/assignments', [AssignmentController::class, 'index']);
    // Route::post('/assignments/submit', [AssignmentController::class, 'submit']);
    // Route::get('/resources', [ResourceController::class, 'index']);
    // Route::get('/schedule', [ScheduleController::class, 'index']);
    // Route::get('/community-posts', [CommunityController::class, 'index']);
    // Route::post('/community-posts', [CommunityController::class, 'store']);
    // Route::get('/profile', [ProfileController::class, 'show']);
    // Route::put('/profile', [ProfileController::class, 'update']);
});
