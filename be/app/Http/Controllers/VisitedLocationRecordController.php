<?php

namespace App\Http\Controllers;

use App\Models\UserAccount;
use App\Models\VisitedLocationRecord;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VisitedLocationRecordController extends Controller
{
    //Visited Station
    public function stationVisited(Request $request)
    {
        $visited = VisitedLocationRecord::with('userAccount')->where('location_id', $request->user()->location_id)->latest()->get();

        return response()->json(['data' => $visited]);
    }

    //Visited Location
    public function visited(Request $request)
    {
        $visited = VisitedLocationRecord::with('userAccount')->where('location_id', $request->location_id)->get();

        return response()->json(['data' => $visited]);
    }

    //Visited Location
    public function dailyVisit(Request $request)
    {

        $visited = VisitedLocationRecord::with('userAccount')->where('location_id', $request->location_id)->whereDate('created_at', Carbon::now())->get();

        return response()->json(['data' => $visited]);
    }
    //Clinic Logs Records
    public function getRecord()
    {
        $record = VisitedLocationRecord::with(['userAccount', 'location'])->latest()->paginate(6);
        return response()->json(['data' => $record]);
    }
    public function perStation($id)
    {
        $record = VisitedLocationRecord::where('location_id', $id)->with(['userAccount', 'location'])->latest()->paginate(6);
        return response()->json(['data' => $record]);
    }

    public function getUserRecord(Request $request)
    {
        $record = VisitedLocationRecord::with(['location'])->where('user_account_id', $request->user()->id)->orderBy('created_at', 'desc')->get();

        return response()->json(['data' => $record]);
    }

    public function getAllRecord(Request $request)
    {
        $record = VisitedLocationRecord::where('user_account_id', $request->user()->id)->get();

        return response()->json(['data' => $record]);
    }


    public function filterUserRecord(Request $request)
    {
        $record = VisitedLocationRecord::where('location_id', $request->location)
            ->where('user_account_id', $request->user()->id)->get();

        return response()->json(['data' => $record]);
    }

    public function getVisitedLocation($id)
    {
        $visited = VisitedLocationRecord::with(['userAccount.classification', 'location', 'userAccount.userTagged', 'userAccount.userPatient'])
        ->where('user_account_id', $id)->whereNot('user_account_id', $id)->get();

        return response()->json(['data' => $visited]);
    }

    public function filterVisitedLocation(Request $request, $id)
    {
        $request->validate([
            // 'location' => ['required'],
            'date' => ['required']
        ]);

        if (!$request->filled('location')) {

            $user = VisitedLocationRecord::whereHas('location', function ($q) {
                $q->where('required', 1);
            })->where('user_account_id', $id)
                ->whereNot('user_account_id', $id)
                ->whereDate('created_at', $request->date)
                ->oldest()->first();

            if (!$user) {
                return response()->json(['data' => []]);
            }

            $visited = VisitedLocationRecord::whereHas('location', function ($q) {
                $q->where('required', 1);
            })->with(['userAccount.classification', 'location', 'userAccount.userTagged', 'userAccount.userPatient'])
                ->whereNot('user_account_id', $user->user_account_id)
                ->whereDate('created_at', $request->date)
                ->whereTime('created_at', '>=', $user->created_at)
                ->get();

            return response()->json(['data' => $visited]);
        }


        $user = VisitedLocationRecord::whereHas('location', function ($q) {
            $q->where('required', 1);
        })->where('user_account_id', $id)
            ->where('location_id', $request->location)
            ->whereDate('created_at', $request->date)
            ->oldest()->first();

        //check if exist in location
        if (!$user) {
            return response()->json(['data' => []]);
        }

        $visited = VisitedLocationRecord::whereHas('location', function ($q) {
            $q->where('required', 1);
        })->with(['userAccount.classification', 'location', 'userAccount.userTagged', 'userAccount.userPatient'])
            ->whereNot('user_account_id', $user->user_account_id)
            ->whereDate('created_at', $request->date)
            ->whereTime('created_at', '>=', $user->created_at)
            ->where('location_id', $request->location)->get();

        return response()->json(['data' => $visited]);
    }
}
