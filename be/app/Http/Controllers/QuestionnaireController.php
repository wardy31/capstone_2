<?php

namespace App\Http\Controllers;

use App\Models\Questionnaire;
use Illuminate\Http\Request;

class QuestionnaireController extends Controller
{
    public function show()
    {
        return response()->json(['data' => Questionnaire::all()]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required',
        ]);

        $res = Questionnaire::create([
            'question' => $request->question,
            'sub_question' => $request->sub_question,
            'required' => true
        ]);
        return response()->json(['data' => $res]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'question' => 'required',
        ]);

        $res = Questionnaire::where('id', $id)->update([
            'question' => $request->question,
            'sub_question' => $request->sub_question,
            'required' => true
        ]);
        
        return response()->json(['data' => $res]);
    }

    public function delete($id)
    {
        $res = Questionnaire::find($id)->delete();

        return response()->json(['data' => $res]);
    }
}
