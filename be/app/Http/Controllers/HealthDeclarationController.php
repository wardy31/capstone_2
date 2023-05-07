<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\ClinicNotification;
use App\Models\HealthDeclaration;
use App\Models\Questionnaire;
use App\Models\UserAccount;
use App\Models\UserPatient;
use App\Models\UserResponse;
use App\Models\UserTagged;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HealthDeclarationController extends Controller
{
    public function responseSearch($searchId)
    {
        $staff = UserResponse::with(['answers.question', 'userAccount'])
            ->whereHas('userAccount', function ($q) use ($searchId) {
                $q->where('first_name', 'like', $searchId . "%")
                    ->orWhere('middle_name', 'like', $searchId . "%")
                    ->orWhere('last_name', 'like', $searchId . "%");
            })->latest()->get();

        return response()->json(["data" => $staff]);
    }
    public function getResponses()
    {
        $res = UserResponse::with(['answers.question', 'userAccount.classification'])->latest()->paginate(6);
        $today = UserResponse::where('created_at', Carbon::now())->count();
        $total = UserResponse::count();
        return response()->json(['data' => $res, 'today' => $today, 'total' => $total]);
    }


    public function checkStatus(Request $request)
    {
        $user = UserAccount::with(['userTagged' => function ($q) use ($request) {
            $q->where('user_account_id', $request->user()->id)->where('isActive', 1);
        }, 'userPatient' => function ($q) use ($request) {
            $q->where('user_account_id', $request->user()->id)->where('isActive', 1);
        }, 'userPatient.contactCategory', 'userTagged.contactCategory'])->where('id', $request->user()->id)->first();

        return response()->json(['data' => $user]);
    }

    public function getQuestions()
    {
        $questionnaire = Questionnaire::all();

        return response()->json(['data' => $questionnaire]);
    }


    public function getAllResponses()
    {
        $responses = UserResponse::with(['answers.question', 'userAccount.classification'])->latest()->get();

        return response()->json(['data' => $responses]);
    }

    public function getDateResponse(Request $request)
    {
        $responses = UserResponse::with(['answers.question', 'userAccount.classification'])->whereDate('created_at', $request->date)->latest()->get();
        return response()->json(['data' => $responses]);
    }

    //Get User didto an ira check profile
    public function getUserForm($id)
    {
        $user = UserResponse::with('answers.question')->where('user_account_id', $id)->get();
        return response()->json(['data' => $user]);
    }

    public function checkUserForm(Request $request)
    {
        $user = UserResponse::where('user_account_id', $request->user()->id)->whereDate('created_at', Carbon::now());

        if ($user->exists()) {
            $user = Answer::with('question')->where('user_response_id', $user->first()->id)->whereDate('created_at', Carbon::now())->get();
            return response()->json(['data' => $user, 'exists' => true]);
        }

        return response()->json(['data' => [], 'exists' => false]);
    }

    public function submitForm(Request $request)
    {
        ClinicNotification::create([
            'user_account_id' => $request->user()->id,
            'type' => 1,
            'message' => "Health Declaration Response Submitted"
        ]);

        $userResponse = UserResponse::query()->where('user_account_id', $request->user()->id)
            ->whereDate('created_at', Carbon::now());

        if ($userResponse->exists()) {
            // continuation
            // ig uupdate didi an form na gi edit

            Answer::where('user_response_id', $userResponse->first()->id)->delete();

            $collection = collect($request->answers)->toArray();

            $array = [];
            foreach ($collection as $val) {
                Answer::create(['user_response_id' => $userResponse->first()->id, 'questionnaire_id' => $val['questionnaire_id'], 'answer' => $val['answer']]);
                array_push($array, ['user_response_id' => $userResponse->first()->id, 'questionnaire_id' => $val['questionnaire_id'], 'answer' => $val['answer']]);
            }

            return response(['data' =>   $array, 'exist' => true]);
        }


        $user = new UserResponse;
        $user->user_account_id = $request->user()->id;
        $user->save();
        $array = [];
        // $convert = json_decode($request->all , true);
        $collection = collect($request->answers)->toArray();

        foreach ($collection as $val) {
            Answer::create(['user_response_id' => $user->id, 'questionnaire_id' => $val['questionnaire_id'], 'answer' => $val['answer']]);
            array_push($array, ['user_response_id' => $user->id, 'questionnaire_id' => $val['questionnaire_id'], 'answer' => $val['answer']]);
        }

        return response(['data' => $array, 'exist' => true]);
    }
}
