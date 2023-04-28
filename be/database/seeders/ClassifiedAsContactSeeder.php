<?php

namespace Database\Seeders;

use App\Models\ClassifiedAsContact;
use App\Models\ClassifiedCloseContact;
use App\Models\UserPatient;
use App\Models\UserTagged;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassifiedAsContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserTaggedSeeder::class,
            UserPatientSeeder::class,
        ]);

        ClassifiedAsContact::create(['user_tagged_id' => 3,'user_patient_id' => 3]);
    }
}
