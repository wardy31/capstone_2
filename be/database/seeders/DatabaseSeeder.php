<?php

namespace Database\Seeders;

use App\Models\ClinicAccount;
use App\Models\ContactCategory;
use App\Models\Questionnaire;
use App\Models\VisitedLocationRecord;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DiseaseSeeder::class,
            RoleSeeder::class,
            ClassificationSeeder::class,
            UserAccountSeeder::class,
            ClinicAccountSeeder::class,
            LocationSeeder::class,
            StationAccountSeeder::class,
            VisitedLocationRecordSeeder::class,
            QuestionnaireSeeder::class,
            ContactCategorySeeder::class
        ]);
        // \App\Models\User::factory(10)->create();
    }
}
