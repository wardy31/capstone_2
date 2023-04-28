<?php

namespace Database\Seeders;

use App\Models\ClinicAccount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClinicAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clinic = [
            "first_name" => "rhea",
            "middle_name" => "mae",
            "last_name" => "bagro",
            "gender" => 'female',
            "contact_number" => "09270334321",
            "email" => "admin@gmail.com",
            "username" => "admin",
            "password" => Hash::make('password'),
            "role_id" => 1,
            "is_approve" => false
        ];

        ClinicAccount::insert($clinic);
    }
}
