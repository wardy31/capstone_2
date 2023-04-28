<?php

namespace Database\Seeders;

use App\Models\UserAccount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [[
            "first_name" => "eduardo",
            "middle_name" => "talon",
            "last_name" => "macabacyao",
            "gender" => "male",
            "address" => "naga-naga",
            "email" => "warded2@gmail.com",
            "classification_id" => 1,
            "vaccination_status" => "fully vacinated",
            "username" => "user",
            "contact_number" => "09270334321",
            "department" => "IT",
            "password" => Hash::make('password')
        ], [
            "first_name" => "rhea",
            "middle_name" => "mae",
            "last_name" => "bagro",
            "gender" => "female",
            "address" => "naga-naga",
            "email" => "warded3@gmail.com",
            "classification_id" => 1,
            "vaccination_status" => "fully vacinated",
            "username" => "user1",
            "contact_number" => "09270334321",
            "department" => "IT",
            "password" => Hash::make('password')
        ],
        [
            "first_name" => "raineil",
            "middle_name" => "s",
            "last_name" => "saclay",
            "gender" => "male",
            "address" => "naga-naga",
            "email" => "wardde54@gmail.com",
            "classification_id" => 1,
            "vaccination_status" => "fully vacinated",
            "username" => "user2",
            "contact_number" => "09270334321",
            "department" => "IT",
            "password" => Hash::make('password')
        ], [
            "first_name" => "roy",
            "middle_name" => "doque",
            "last_name" => "badajos",
            "gender" => "male",
            "address" => "naga-naga",
            "email" => "2was@gmail.com",
            "classification_id" => 1,
            "vaccination_status" => "fully vacinated",
            "username" => "user3",
            "contact_number" => "09270334321",
            "department" => "IT",
            "password" => Hash::make('password')
        ]
    ];


        UserAccount::insert($user);
    }
}
