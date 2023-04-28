<?php

namespace Database\Seeders;

use App\Models\UserPatient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserPatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserPatient::create(['user_account_id' => 1,'contact_category_id' => 1,'disease_id' =>1,'duration' => '14','isActive'=> 1]);
    }
}
