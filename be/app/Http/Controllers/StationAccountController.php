<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\StationAccount;
use App\Models\UserAccount;
use App\Models\VisitedLocationRecord;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StationAccountController extends Controller
{   
    public function stationSearch($searchId){
        $res = StationAccount::with('location')->whereHas('location',function($q) use($searchId){
            $q->where('name','like',$searchId."%");
        })->get();
        return response()->json(['data' => $res]);
    }
    public function matchUser(Request $request){
        $user = UserAccount::where('last_name',$request->user_id )->first();

        $visited = new VisitedLocationRecord ;
        $visited->user_account_id = $user->id;
        $visited->location_id = $request->location_id;
        $visited->time_in = Carbon::now()->toTimeString(); 
        $visited->save();

        return response()->json(['data' => $visited]);
    }

    public function getStation(){
        $station = StationAccount::with('location')->paginate(6);

        return response()->json(['data' => $station]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        $station = StationAccount::with(['location'])->where('username', $request->username)->first();

        //if  exist
        if (!$station) {
            return response()->json(['message' => "Username Doesn't Exist"], 400);
        }
        //check password
        if (!Hash::check($request->password, $station->password)) {
            return response()->json(['message' => "Password Doesn't Match"], 400);
        }

        if (!$station->is_active) {
            return response()->json(['message' => "The Account is not active"], 400);
        }

        $token = $station->createToken('token')->plainTextToken;

        return response()->json(['data' => $station, 'token' => $token,'url' => $request->schemeAndHttpHost().'/storage']);
    }


    public function store(Request $request)
    {

        $request->validate([
            'location' => ['required',"unique:locations,name"]
        ]);

        $location = new Location;
        $location->name = $request->location;
        $location->save();

        if(StationAccount::doesntExist()){
            $account = "STATION"."-".str_pad(1,5,0,STR_PAD_LEFT);
            $station = new StationAccount;
            $station->location_id = $location->id;
            $station->username = $account;
            $station->password = Hash::make($account);
            $station->save();

            return response(['data' => $station]);
        }

        $get_station = StationAccount::latest()->first()->id;
        $account = "STATION"."-".str_pad($get_station + 1,5,0,STR_PAD_LEFT);
        $station = new StationAccount;
        $station->location_id = $location->id;
        $station->username = $account;
        $station->password = Hash::make($account);
        $station->save();

        return response(['data' => $station,'name' => $location->name, 'id' => $location->id]);
    }

    public function delete($id){
        $station = Location::find($id);
        $station->delete();

        return response(['data' => $station]);
    }

    public function changeStatus(Request $request, $id){
        $station  = StationAccount::find($id);
        $station->is_active = !$request->is_active;
        $station->save();
        
        return response(['data' => $station]);
    }
}
