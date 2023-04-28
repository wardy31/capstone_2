<?php

namespace Database\Seeders;

use App\Models\ClassifiedAsContact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassifiedCloseContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ClassifiedAsContact::create(['user_patient_id' => 1,'user_tagged_id' => 1]);
    }
}
