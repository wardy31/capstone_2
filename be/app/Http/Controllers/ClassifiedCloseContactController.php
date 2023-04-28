<?php

namespace App\Http\Controllers;

use App\Models\ClassifiedAsContact;
use App\Models\Disease;
use App\Models\UserPatient;
use App\Models\UserTagged;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClassifiedCloseContactController extends Controller
{
    public function asContact(Request $request)
    {
        $disease = Disease::where('is_active', true)->first();

        $user = UserPatient::where('user_account_id', $request->patient)->where('isActive', true);

        $tagged = new UserTagged;
        $tagged->user_account_id = $request->tag;
        $tagged->disease_id = $disease->id;
        $tagged->contact_category_id = 1;
        $tagged->save();

        $classified = new ClassifiedAsContact;

        if ($user->exists()) {
            $classified->user_patient_id = $user->first()->id;
            $classified->user_tagged_id = $tagged->id;
            $classified->is_active = 1;
            $classified->save();

            return response()->json(['data' => $classified, 'exist' => 'yah']);
        }

        $patient = new UserPatient;
        $patient->user_account_id = $request->patient;
        $patient->disease_id = $disease->id;
        $patient->contact_category_id = 1;
        $patient->save();

        $classified->user_patient_id = $patient->id;
        $classified->user_tagged_id = $tagged->id;
        $classified->is_active = 1;
        $classified->save();
        return response()->json(['data' => $classified]);
    }

    public function getAllPatient()
    {
        $contact = UserPatient::with(['userAccount.classification', 'contacts.userTagged.userAccount.classification', 'contacts.userPatient.userAccount.classification', 'contacts.userTagged.disease', 'disease'])->orderBy('disease_id', 'desc')->latest()->get();

        $active = UserPatient::get();
        $sortActive = [];

        foreach ($active as $pat) {
            if (!Carbon::now()->isAfter(Carbon::parse($pat->created_at)->addDays($pat->duration))) {
                array_push($sortActive, $pat);
            }
        }
        return response()->json(['data' => $contact, 'active_patient' => count($sortActive)]);
    }

    public function getDatePatient(Request $request)
    {
        if (!$request->has('date') && $request->has('disease_id')) {
            $contact = UserPatient::with(['userAccount.classification', 'contacts', 'disease'])
                ->where('disease_id', $request->disease_id)
                ->orderBy('disease_id', 'desc')->latest()->get();
            return response()->json(['data' => $contact]);
        }

        if ($request->has('disease_id') && $request->has('date')) {
            $contact = UserPatient::with(['userAccount.classification', 'contacts', 'disease'])
                ->whereDate('created_at', $request->date)
                ->where('disease_id', $request->disease_id)
                ->orderBy('disease_id', 'desc')->latest()->get();
            return response()->json(['data' => $contact]);
        }

        $contact = UserPatient::with(['userAccount.classification', 'contacts', 'disease'])
            ->whereDate('created_at', $request->date)
            ->orderBy('disease_id', 'desc')
            ->latest()->get();

        return response()->json(['data' => $contact]);
    }

    public function getDateTaggeds(Request $request)
    {

        if (!$request->has('date') && $request->has('disease_id')) {
            $contact = UserTagged::with(['userAccount.classification', 'disease', 'contactWith.userPatient.userAccount.classification'])
                ->where('disease_id', $request->disease_id)
                ->orderBy('disease_id', 'desc')->latest()->get();
            return response()->json(['data' => $contact]);
        }

        if ($request->has('disease_id') && $request->has('date')) {
            $contact = UserTagged::with(['userAccount.classification', 'disease', 'contactWith.userPatient.userAccount.classification'])
                ->whereDate('created_at', $request->date)
                ->where('disease_id', $request->disease_id)
                ->orderBy('disease_id', 'desc')->latest()->get();
            return response()->json(['data' => $contact]);
        }

        $contact = UserTagged::with(['userAccount.classification', 'disease', 'contactWith.userPatient.userAccount.classification'])
            ->whereDate('created_at', $request->date)
            ->orderBy('disease_id', 'desc')
            ->latest()->get();

        return response()->json(['data' => $contact]);
    }

    public function getAllTagged()
    {
        $contact = UserTagged::with(['userAccount.classification', 'disease', 'contactWith.userPatient.userAccount.classification'])
            ->latest()->get();

        return response()->json(['data' => $contact]);
    }

    public function getPatient()
    {
        $contact = UserPatient::with(['userAccount.classification', 'contacts', 'disease'])->latest()->paginate(6);

        $active = UserPatient::get();
        $sortActive = [];

        foreach ($active as $pat) {
            if (!Carbon::now()->isAfter(Carbon::parse($pat->created_at)->addDays($pat->duration))) {
                array_push($sortActive, $pat);
            }
        }
        return response()->json(['data' => $contact, 'active_patient' => count($sortActive)]);
    }

    public function getTaggedContacts($id)
    {
        $contact = UserTagged::whereHas('contacts', function ($query) use ($id) {
            $query->where('user_patient_id', $id);
        })->with(['userAccount.classification', 'disease'])->latest()->get();
        return response()->json(['data' => $contact]);
    }

    public function deleteTaggedContact($id)
    {
        $contact = UserTagged::find($id);
        $contact->delete();

        return response()->json(['data' => $contact]);
    }

    public function deletePatientContact($id)
    {
        $contact = UserPatient::find($id);
        $contact->delete();

        return response()->json(['data' => $contact]);
    }

    public function updateTaggedDuration(Request $request, $id)
    {
        $tag = UserTagged::find($id);
        $tag->duration = $request->duration;
        $tag->save();

        return response()->json(['data' => $tag]);
    }

    public function updatePatientDuration(Request $request, $id)
    {
        $patient = UserPatient::find($id);
        $patient->duration = $request->duration;
        $patient->save();
        return response()->json(['data' => $patient]);
    }

    public function selectedContact(Request $request, $id)
    {
        $disease = Disease::where('is_active', true)->first();

        $user = UserPatient::where('user_account_id', $id)->where('isActive', true);

        foreach ($request->selected as $select) {

            $tagged = new UserTagged;
            $tagged->user_account_id = $select;
            $tagged->disease_id = $disease->id;
            $tagged->contact_category_id = 1;
            $tagged->save();

            $classified = new ClassifiedAsContact;

            if ($user->exists()) {
                $classified->user_patient_id = $user->first()->id;
                $classified->user_tagged_id = $tagged->id;
                $classified->is_active = 1;
                $classified->save();
            } else {
                $patient = new UserPatient;
                $patient->user_account_id = $id;
                $patient->disease_id = $disease->id;
                $patient->contact_category_id = 1;
                $patient->save();

                $classified->user_patient_id = $patient->id;
                $classified->user_tagged_id = $tagged->id;
                $classified->is_active = 1;
                $classified->save();
            }
        }

        return response()->json(['data' => $classified]);
    }
}
