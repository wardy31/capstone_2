<?php

namespace Database\Seeders;

use App\Models\ContactCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContactCategory::insert(
            ['category' => 'Close Contact'],
            ['category' => 'Confirmed Case']
        );
    }
}
