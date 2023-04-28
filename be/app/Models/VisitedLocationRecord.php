<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitedLocationRecord extends Model
{
    use HasFactory;

    protected $fillable=['location_id','user_account_id'];
    
    public function userAccount (){
        return $this->hasOne(UserAccount::class,'id','user_account_id');
    }

    public function location (){

        return $this->hasOne(Location::class,'id','location_id');

    }
}
