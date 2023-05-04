<?php

namespace App\Http\Controllers;

use App\Models\FollowUp;
use App\Models\HealthDeclaration;
use App\Models\UserAccount;
use App\Models\UserPatient;
use App\Models\UserResponse;
use App\Models\UserTagged;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FollowUpController extends Controller
{
    public function getFollowUps()
    {
        $follow = FollowUp::with('users')->get();

        return response()->json(['data' => $follow]);
    }

    public function storeFollowUp(Request $request)
    {

        $request->validate([
            'status' => 'required'
        ]);
        $follow = new FollowUp;

        $follow->user_account_id = $request->user()->id;
        $follow->follow_up_status = $request->status;

        $follow->save();

        return response()->json(['data' => $follow]);
    }

    public function checkFollowUp(Request $request)
    {
        $user = UserAccount::with(['userTagged', 'userPatient'])->where('id', $request->user()->id)->latest();

        //if not exist
        // if ($user->doesntExist()) {
        //     $healthDeclare = UserResponse::where('user_account_id', $request->user()->id)->whereDate('created_at', Carbon::now())->exists();
        //     return response()->json(['data' => [], 'healthDeclaration' => $healthDeclare]);
        // }

        // //if has now follow up data
        $now = Carbon::now();
        $followUp = FollowUp::where('user_account_id', $user->first()->id)->whereDate('created_at', $now)->exists();
        $healthDeclare = UserResponse::where('user_account_id', $request->user()->id)->whereDate('created_at', Carbon::now())->exists();

        return response()->json(['data' => [$user->first()], 'followUp' => $followUp, 'healthDeclaration' => $healthDeclare]);
    }


    public function allFollowUp()
    {
        $followUp = FollowUp::with('users');
        $all = UserTagged::where('isActive', true)->count() + UserPatient::where('isActive', true)->count();
        return response()->json(['data' => $followUp->latest()->paginate(6), 'tcount' => $followUp->whereDate('created_at', Carbon::now())->count(), 'acontact' => $all]);
    }

    public function followUpRespondent()
    {
    }

    public function userFollowUp(Request $request)
    {
        return response(['exist' => FollowUp::where('user_account_id', $request->user()->id)->whereDate('created_at', Carbon::now()->toDateString())->exists()]);
    }
    public function submitFollowUp(Request $request)
    {
        FollowUp::create(['user_account_id' => $request->user()->id, 'follow_up_status' => $request->form]);
        return response(['message' => "Submitted"]);
    }
}
