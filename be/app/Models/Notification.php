<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    public function userAccount(){
        return $this->hasOne(UserAccount::class,'id','user_account_id');
    }
}
