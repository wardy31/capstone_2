<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassifiedAsContact extends Model
{
    use HasFactory;

    public function userPatient(){
        return $this->hasOne(UserPatient::class,'id','user_patient_id');
    }

    public function userTagged(){
        return $this->hasOne(UserTagged::class,'id','user_tagged_id');
    }

    public function contactCategory(){
        return $this->hasOne(ContactCategory::class,'id','contact_category_id');
    }

}
