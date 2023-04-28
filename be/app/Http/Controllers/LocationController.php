<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function show(){
        return response()->json(['data' => Location::all()]);
    }
}
