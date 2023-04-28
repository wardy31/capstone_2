<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class StationAccount extends Model
{
    use HasApiTokens, HasFactory;

    public function location(){
        return $this->hasOne(Location::class,'id','location_id');
    }
}
