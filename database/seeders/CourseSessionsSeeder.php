<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class CourseSessionsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        $sessions = [
            [
                'course_id' => 1,
                'name' => '2 Weeks Free Bootcamp',
                'start_date' => '2025-08-17',
                'end_date' => '2025-08-31',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'course_id' => 2,
                'name' => '2 Weeks Free Bootcamp',
                'start_date' => '2025-08-17',
                'end_date' => '2025-08-31',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('course_sessions')->insert($sessions);
    }
}
