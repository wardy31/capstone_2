<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = ['user_response_id','questionnaire_id','answer'];

    public function question(){
        return $this->hasOne(Questionnaire::class,'id','questionnaire_id');
    }
}
