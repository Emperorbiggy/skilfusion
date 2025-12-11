<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('course_session_student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('course_sessions')->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('bootcamp_registrations')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['session_id', 'student_id']); // prevent duplicate enrollments
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_session_student');
    }
};
