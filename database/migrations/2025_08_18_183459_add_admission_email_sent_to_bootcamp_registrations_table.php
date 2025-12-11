<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdmissionEmailSentToBootcampRegistrationsTable extends Migration
{
    public function up()
    {
        Schema::table('bootcamp_registrations', function (Blueprint $table) {
            $table->boolean('admission_email_sent')->default(false)->after('student_id');
        });
    }

    public function down()
    {
        Schema::table('bootcamp_registrations', function (Blueprint $table) {
            $table->dropColumn('admission_email_sent');
        });
    }
}