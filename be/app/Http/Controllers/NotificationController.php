<?php

namespace App\Http\Controllers;

use App\Models\ClinicNotification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function show(){
        $response = ClinicNotification::with('userAccount')->latest()->get();
        return response()->json($response);
    }
}
