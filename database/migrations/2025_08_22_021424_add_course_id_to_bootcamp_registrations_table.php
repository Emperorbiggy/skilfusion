<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('bootcamp_registrations', function (Blueprint $table) {
            $table->foreignId('course_id')->nullable()->after('course')->constrained('courses')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('bootcamp_registrations', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropColumn('course_id');
        });
    }
};
