<?php

namespace Database\Seeders;

use App\Models\UserTagged;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTaggedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserTagged::create(['user_account_id' => 1,'contact_category_id' => 1,'disease_id' =>1,'duration' => '14','isActive'=> 1]);
    }
}
