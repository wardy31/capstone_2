<?php

namespace App\Http\Controllers;

use App\Models\FollowUp;
use App\Models\UserAccount;
use App\Models\UserPatient;
use App\Models\UserResponse;
use App\Models\VisitedLocationRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserAccountController extends Controller
{
    public function users()
    {
        return response()->json(['data' => UserAccount::with('classification')->paginate(6)]);
    }
    public function  patientSearch($searchId)
    {
        $contact = UserPatient::whereHas('userAccount', function ($q) use ($searchId) {
            $q->where('first_name', 'like', $searchId . "%")
                ->orWhere('middle_name', 'like', $searchId . "%")
                ->orWhere('last_name', 'like', $searchId . "%");
        })->with(['userAccount.classification', 'contacts', 'disease'])
            ->orderBy('disease_id', 'asc')->get();

        return response()->json(['data' => $contact]);
    }

    public function userSearch($searchId)
    {
        $res = UserAccount::with(['classification'])
            ->where('first_name', 'like', $searchId . "%")
            ->orWhere('middle_name', 'like', $searchId . "%")
            ->orWhere('last_name', 'like', $searchId . "%")->get();

        return response(['data' => $res]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        $userAccount = UserAccount::where('username', $request->username)->with('classification')->first();

        //if  exist
        if (!$userAccount) {
            return response()->json(['errors' => ['username' => "Username Doesn't Exist"]], 400);
        }
        //check password
        if (!Hash::check($request->password, $userAccount->password)) {
            return response()->json(['errors' => ['password' => "Password Doesn't Match"]], 400);
        }

        $token = $userAccount->createToken('token')->plainTextToken;

        return response()->json(['data' => $userAccount, 'token' => $token, 'url' => $request->schemeAndHttpHost() . '/storage']);
    }


    public function store(Request $request)
    {

        $request->validate([
            'first_name' => ['required'],
            // 'middle_name' => ['required'],
            'last_name' => ['required'],
            'gender' => ['required'],
            'address' => ['required'],
            'email' => ['required', 'email', 'unique:user_accounts,email', 'unique:clinic_accounts,email'],
            'department' => ['required'],
            'contact_number' => ['required', 'min:11', 'max:11'],
            'classification_id' => ['required'],
            'vaccination_status' => ['required'],
            // 'images_path' => ['required'],
            'username' => ['required', 'unique:clinic_accounts,username', 'unique:user_accounts,username', 'unique:station_accounts,username', 'min:4'],
            'password' => ['required', 'confirmed', 'min:8'],
            'upload_1' => ['required'],
            'upload_2' => ['required']
        ]);

        $image = $request->file('upload_1')->storeAs('user/' . $request->username, $request->username . "." . $request->file('upload_1')->extension(), 'public');
        $user = new UserAccount;

        $user->first_name = $request->first_name;
        $user->middle_name = $request->middle_name;
        $user->last_name = $request->last_name;
        $user->gender = $request->gender;
        $user->address = $request->address;
        $user->email = $request->email;
        $user->department = $request->department;
        $user->contact_number = $request->contact_number;
        $user->classification_id = $request->classification_id;
        $user->vaccination_status = $request->vaccination_status;
        $user->images_path = $image;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);

        $user->save();

        return response(['data' => $user, 'url' => $request->schemeAndHttpHost() . "/storage"]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['required'],
            'last_name' => ['required'],
            'gender' => ['required'],
            'address' => ['required'],
            //'email' => ['required','email','unique:user_accounts,email','unique:clinic_accounts,email'],
            'department' => ['required'],
            'contact_number' => ['required', 'min:11', 'max:11'],
            //'classification_id' => ['required'],
            ///'vaccination_status' => ['required'],
            //'images_path' => ['required'],
        ]);

        $user = UserAccount::with(['classification'])->find($id);

        $user->first_name = $request->first_name;
        $user->middle_name = $request->middle_name;
        $user->last_name = $request->last_name;
        $user->gender = $request->gender;
        $user->address = $request->address;
        // $user->email = $request->email;
        $user->department = $request->department;
        $user->contact_number = $request->contact_number;
        $user->vaccination_status = $request->vaccination_status;
        // $user->classification_id = $request->classification_id;
        //$user->images_path = $request->images_path;
        $user->save();
        return response(['data' => $user]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'password' => ['required', 'confirmed'],
            'current_password' => ['required']
        ]);

        $user = UserAccount::where('id', $request->user()->id)->first();

        // Check Password
        if (!Hash::check($request->current_password, $user->password)) {
            return response(['errors' => ['current_password' => 'The current password does not match']], 400);
        }

        $user->password = Hash::make($request->password);

        $user->save();

        return response(['message' => "Change Password Successfully"]);
    }

    public function getProfile($id)
    {
        $user = UserAccount::with(['classification', 'userTagged.contactCategory', 'userPatient.contactCategory'])->find($id);
        return response()->json($user);
    }

    public function userDetails(Request $request, $id)
    {
        $hdrResponse = UserResponse::with('answers.question')->where('user_account_id', $id)->get();
        $visitedStation = VisitedLocationRecord::with('location')->where('user_account_id', $id)->get();
        $followUps = FollowUp::where('user_account_id', $id)->get();


        return response()->json(['hdr' => $hdrResponse, 'visited' => $visitedStation, 'followUps' => $followUps]);
    }
}
