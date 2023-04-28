<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    use HasFactory;

    protected $fillable = ['user_account_id','follow_up_status'];

    public function users(){
        return $this->hasOne(UserAccount::class,'id','user_account_id');
    }
}
