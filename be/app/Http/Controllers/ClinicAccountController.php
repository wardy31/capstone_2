<?php

namespace App\Http\Controllers;

use App\Models\ClassifiedAsContact;
use App\Models\ClinicAccount;
use App\Models\FollowUp;
use App\Models\StationAccount;
use App\Models\UserPatient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClinicAccountController extends Controller
{
    public function editProfile(Request $request, $id)
    {
        $request->validate([
            'first_name' => ['required'],
            // 'middle_name' => ['required'],
            'last_name' => ['required'],
            'gender' => ['required'],
            'contact_number' => ['required', 'numeric', 'min:11'],
            'address' => ['required'],
            'email' => ['required', 'email'],
            'role' => ['required']
        ]);

        $clinic = ClinicAccount::where('id', $id)->update([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'address' => $request->address,
            'contact_number' => $request->contact_number,
            'email' => $request->email,
            'role_id' => $request->role,
        ]);

        return response()->json(['message' => $clinic]);
    }

    public function changePassword(Request $request, $id)
    {
        $request->validate([
            'old_password' => ['required'],
            'new_password' => ['required', 'confirmed'],
        ]);

        $clinic = ClinicAccount::find($id);

        if (!Hash::check($request->old_password, $clinic->password)) {
            return response()->json(['errors' => ['old_password' => ['The password was incorrect']]], 400);
        }

        $clinic->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json(['message' => $clinic]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        $clinic = ClinicAccount::where('username', $request->username)->first();

        //if  exist
        if (!$clinic) {
            return response()->json(['message' => "Username Doesn't Exist"], 400);
        }
        //check password
        if (!Hash::check($request->password, $clinic->password)) {
            return response()->json(['message' => "Password Doesn't Match"], 400);
        }

        $token = $clinic->createToken('token')->plainTextToken;

        return response()->json(['data' => $clinic, 'token' => $token]);
    }


    public function store(Request $request)
    {

        $request->validate([
            'first_name' => ['required'],
            // 'middle_name' => ['required'],
            'last_name' => ['required'],
            'gender' => ['required'],
            'email' => ['required', 'email', 'unique:clinic_accounts,email', 'unique:user_accounts,email'],
            'contact_number' => ['required', 'min:11'],
            'address' => ['required'],
            'role' => ['required']
        ]);

        $get_clinic = ClinicAccount::latest()->first()->id;
        $account = 'CLINIC' . '-' . str_pad($get_clinic + 1, 5, 0, STR_PAD_LEFT);

        $clinic = new ClinicAccount;
        $clinic->first_name = $request->first_name;
        $clinic->middle_name = $request->middle_name;
        $clinic->last_name = $request->last_name;
        $clinic->gender = $request->gender;
        $clinic->email = $request->email;
        $clinic->address = $request->address;
        $clinic->role_id = 1;
        $clinic->contact_number = $request->contact_number;
        $clinic->username = $account;
        $clinic->password = Hash::make($account);
        $clinic->save();

        return response(['data' => $clinic]);
    }

    public function staffSearch($searchId)
    {
        $staff = ClinicAccount::with(['role'])
            ->where('first_name', 'like', $searchId . "%")
            ->orWhere('middle_name', 'like', $searchId . "%")
            ->orWhere('last_name', 'like', $searchId . "%")->get();

        return response()->json(["data" => $staff]);
    }

    public function staffs()
    {
        // $staff = ClinicAccount::with(['role'])->where('is_approve', true)->get();
        $staff = ClinicAccount::with(['role'])->paginate(6);

        return response()->json(["data" => $staff]);
    }
    public function approvalList()
    {
        $approval = ClinicAccount::with(['role'])->where('is_approve', false)->get();

        return response()->json(["data" => $approval]);
    }

    public function getCounts()
    {
        $clinic = ClinicAccount::count();
        $station = StationAccount::count();        
        $followUp = FollowUp::with('users')->whereDate('created_at',Carbon::now())->get();
        $monthClassifedContacts = UserPatient::with(['contacts.userTagged.userAccount', 'userAccount', 'disease'])
        ->whereMonth('created_at', Carbon::now())
        ->latest()
        ->get();
        
        $active = UserPatient::get();
        $sortActive = [];
        foreach ($active as $pat) {
            if (!Carbon::now()->isAfter(Carbon::parse($pat->created_at)->addDays($pat->duration))) {
                array_push($sortActive, $pat);
            }
        }

        return response()->json([
            "clinic" => $clinic,
            "station" => $station,
            "followUp" => $followUp,
            'active_patient' => count($sortActive),
            'month_contacts' => $monthClassifedContacts
        ]);
    }

    public function approval(Request $request, $id)
    {
        if ($request->status) {
            $clinic = ClinicAccount::find($id);

            $clinic->is_approve = true;
            $clinic->save();

            return response(['data' => 'approved']);
        }

        $clinic = ClinicAccount::find($id);
        $clinic->delete();

        return response(['data' => 'disapproved']);
    }

    public function delete($id)
    {
        $clinic = ClinicAccount::find($id);
        $clinic->delete();

        return response()->json(['data' => 'deleted']);
    }

    public function changeRole(Request $request, $id)
    {
        $clinic = ClinicAccount::find($id);

        $clinic->role_id = $request->role_id;
        $clinic->save();

        return response(['data' => $clinic]);
    }
}
