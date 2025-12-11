<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['course_id' => 1, 'name' => 'Frontend', 'description' => 'HTML, CSS, JS'],
            ['course_id' => 1, 'name' => 'Backend', 'description' => 'PHP, Laravel, Node.js'],
            ['course_id' => 1, 'name' => 'Fullstack', 'description' => 'Combination of frontend & backend'],
            ['course_id' => 2, 'name' => 'UI Design', 'description' => 'User interface design'],
            ['course_id' => 2, 'name' => 'UX Design', 'description' => 'User experience design'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
