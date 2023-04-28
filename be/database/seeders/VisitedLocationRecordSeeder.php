<?php

namespace Database\Seeders;

use App\Models\VisitedLocationRecord;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VisitedLocationRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $records = [
            ['user_account_id' => 1, 'location_id' => 1, 'time_in' => '10:30'],
            ['user_account_id' => 2, 'location_id' => 1, 'time_in' => '10:30'],
            ['user_account_id' => 3, 'location_id' => 1, 'time_in' => '10:30'],
            ['user_account_id' => 4, 'location_id' => 1, 'time_in' => '10:30'],
        ];

        foreach($records as $record){
            VisitedLocationRecord::create($record);
        }
        
    }
}
