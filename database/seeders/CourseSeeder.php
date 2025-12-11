<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            [
                'name' => 'Web Development',
                'description' => 'Learn HTML, CSS, JavaScript, and modern frameworks like Laravel & React.'
            ],
            [
                'name' => 'UI/UX Design',
                'description' => 'Learn user interface and user experience design, wireframing, and prototyping.'
            ],
            [
                'name' => 'Mobile App Development',
                'description' => 'Learn to build native and cross-platform mobile applications.'
            ],
            [
                'name' => 'Data Science',
                'description' => 'Learn Python, data analysis, machine learning, and visualization techniques.'
            ],
            [
                'name' => 'Digital Marketing',
                'description' => 'Learn SEO, social media marketing, email campaigns, and analytics.'
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
