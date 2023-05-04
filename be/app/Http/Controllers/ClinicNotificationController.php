<?php

namespace App\Http\Controllers;

use App\Models\ClinicNotification;
use App\Models\Notification;
use Illuminate\Http\Request;

class ClinicNotificationController extends Controller
{
    public function paginateNotification()
    {
        return response(['data' => ClinicNotification::latest()->paginate(6)]);
    }

    public function notificationAll()
    {
        return response(['data' => ClinicNotification::latest()->get()]);
    }

    public function userPaginateNotification()
    {
        return response(['data' => Notification::latest()->paginate(6)]);
    }

    public function userNotificationAll()
    {
        return response(['data' => Notification::latest()->get()]);
    }
}
