<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserResponse extends Model
{
    use HasFactory;

    public function answers(){
        return $this->hasMany(Answer::class,'user_response_id','id');
    }
    public function userAccount(){
        return $this->hasOne(UserAccount::class,'id','user_account_id');
    }
}
