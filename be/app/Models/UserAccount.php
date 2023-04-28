<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
class UserAccount extends Model
{
    use HasApiTokens,HasFactory;

    protected $hidden = ['password'];

    public function classification(){
        return $this->hasOne(Classification::class,'id', 'classification_id');
    }

    public function userTagged(){
        return $this->hasMany(UserTagged::class,'user_account_id', 'id');
    }

    public function userPatient(){
        return $this->hasMany(UserPatient::class,'user_account_id', 'id');
    }

    public function visitedLocationRecord(){
        return $this->hasMany(VisitedLocationRecord::class,'user_account_id', 'id');
    }

    public function followUps(){
        return $this->hasMany(FollowUp::class,'user_account_id', 'id');
    }

    public function userResponse(){
        return $this->hasOne(UserResponse::class);
    }
}
