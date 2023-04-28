<?php

namespace Database\Seeders;

use App\Models\StationAccount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StationAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $station = ['location_id' => 1, 'username' => 'STATION-00001', 'password' => Hash::make('STATION-00001')];

        StationAccount::create($station);
    }
}
