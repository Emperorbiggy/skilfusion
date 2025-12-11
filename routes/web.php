<?php

use App\Http\Controllers\BootcampRegistrationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/programs', fn () => Inertia::render('Programs'));
Route::get('/dashboard', fn () => Inertia::render('Dashboard'));
Route::get('/signup', fn () => Inertia::render('Auth/Signup'));
Route::post('/register-bootcamp', [BootcampRegistrationController::class, 'register']);
