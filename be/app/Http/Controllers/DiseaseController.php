<?php

namespace App\Http\Controllers;

use App\Models\Disease;
use Illuminate\Http\Request;

class DiseaseController extends Controller
{
    public function diseaseSearch($searchId)
    {
        $search = Disease::where('name', 'like', $searchId . "%")->get();

        return response()->json(["data" => $search]);
    }
    public function show()
    {
        $res = Disease::all();

        return response()->json(['data' => $res]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:diseases,name'
        ]);
        $res = Disease::create([
            'name' => $request->name
        ]);

        return response()->json(['data' => $res]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $res = Disease::where('id', $id)->update([
            'name' => $request->name,
        ]);

        return response()->json(['data' => $res]);
    }

    public function updateStatus(Request $request, $id)
    {
        $res = Disease::where('id', $id)->update([
            'is_active' => !$request->is_active,
        ]);

        Disease::whereNot('id', $id)->update([
            'is_active' => false
        ]);

        return response(['message' => "Updated"]);
    }

    public function delete($id)
    {
        Disease::find($id)->delete();

        return response(['message' => 'deleted']);
    }
}
