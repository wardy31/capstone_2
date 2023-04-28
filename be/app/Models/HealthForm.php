<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthForm extends Model
{
    use HasFactory;

    protected $fillable = ['user_account_id','answer','question','by_order'];
}
