<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('bootcamp_registrations', function (Blueprint $table) {
            $table->string('course', 50)->change(); // increase length to 50
        });
    }

    public function down(): void
    {
        Schema::table('bootcamp_registrations', function (Blueprint $table) {
            $table->string('course', 20)->change(); // revert back if needed
        });
    }
};
