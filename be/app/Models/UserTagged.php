<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTagged extends Model
{
    use HasFactory;

    protected $appends = ['days_left'];
    
    protected function daysLeft(): Attribute
    {
        return new Attribute(
            get: function () {
                if (Carbon::now()->isAfter(Carbon::parse($this->created_at)->addDays($this->duration))) {
                    return 0;
                }
                return Carbon::now()->diffInDays(Carbon::parse($this->created_at)->addDays($this->duration), false);
            }
        );
    }

    public function userAccount(){
        return $this->hasOne(UserAccount::class,'id','user_account_id');
    }

    public function contacts(){
        return $this->hasMany(ClassifiedAsContact::class,'user_tagged_id','id');
    }

    public function contactWith(){
        return $this->hasOne(ClassifiedAsContact::class);
    }

    public function contactCategory(){
        return $this->hasOne(ContactCategory::class,'id','contact_category_id');
    }

    public function disease(){
        return $this->hasOne(Disease::class,'id','disease_id');
    }
}
