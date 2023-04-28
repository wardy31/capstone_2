<?php

namespace App\Http\Controllers;

use App\Models\ClinicNotification;
use Illuminate\Http\Request;

class ClinicNotificationController extends Controller
{
    public function paginateNotification(){
        return response(['data' => ClinicNotification::latest()->paginate(6)]);
    }

    public function notificationAll(){
        return response(['data' => ClinicNotification::latest()->get()]);
    }
}
