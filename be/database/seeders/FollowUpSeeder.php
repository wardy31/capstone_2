<?php

namespace Database\Seeders;

use App\Models\FollowUp;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FollowUpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FollowUp::create(['user_account_id' => 1, 'follow_up_status' => "Dummy"]);
    }
}
