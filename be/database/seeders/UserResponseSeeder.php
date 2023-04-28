<?php

namespace Database\Seeders;

use App\Models\UserResponse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserResponse::create(
            ['user_account_id' => 1]
        );
    }
}
