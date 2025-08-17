<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBootcampRegistrationsTable extends Migration
{
    public function up()
    {
        Schema::create('bootcamp_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('email')->unique();
            $table->string('country');
            $table->string('state');
            $table->string('city');
            $table->string('phone');
            $table->string('whatsapp');
            $table->enum('course', ['web-development', 'ui-ux']);
            $table->string('student_id')->unique(); // Generated student ID
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bootcamp_registrations');
    }
}