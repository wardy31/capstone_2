<?php

namespace App\Http\Controllers;

use App\Models\HealthForm;
use App\Models\UserResponse;
use Illuminate\Http\Request;

class HealthFormController extends Controller
{
    public function submit(Request $request)
    {
        // $request->validate([
        //     "answer" => ['required']
        // ]);
        
        // user_account_id
        // question
        // answer
        // by_order

        // $userCount = UserResponse::where('user_account_id', 1)->get();
        // $collection = collect($request->answer)->toArray();


        //  foreach($collection as $x => $create){
        //     HealthForm::create(['user_account_id' => $request->user()->id,'question' => $x]);
        //  }

        //  $user = new UserResponse;

        //  $user->user_account_id = 1;
        //  $user->by_order = count($userCount) + 1;
        //  $user->save();

        // return response(['data' => $user]);
    }
}
