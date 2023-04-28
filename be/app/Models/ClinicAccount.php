<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class ClinicAccount extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = ['password', 'first_name', 'middle_name','address', 'last_name', 'gender', 'role_id', 'contact_number', 'email'];
    protected $hidden = ['password'];

    public function role()
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }
}
