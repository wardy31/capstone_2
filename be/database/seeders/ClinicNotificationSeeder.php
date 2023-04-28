<?php

namespace Database\Seeders;

use App\Models\ClinicNotification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClinicNotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ClinicNotification::insert([
            ['user_account_id' => 1,'type' => '1',"message" => "Health Declaration Response Submitted"],
            ['user_account_id' => 1,'type' => '2',"message" => "Follow Up Response Submitted "],
            // ['user_account_id' => 1,'type' => '1',"message" => "Health Declaration Submitted"],
        ]);
    }
}
