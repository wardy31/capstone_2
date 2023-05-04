<?php

namespace App\Http\Controllers;

use App\Models\ClinicNotification;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function show(){
        $response = ClinicNotification::with('userAccount')->latest()->get();
        return response()->json($response);
    }

    public function userShow(Request $request){
        $response = Notification::with('userAccount')->where('user_account_id',$request->user()->id)->latest()->get();
        return response()->json($response);
    }
}
