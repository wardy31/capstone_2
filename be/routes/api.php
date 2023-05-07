<?php

use App\Events\ClinicNotification as EventsClinicNotification;
use App\Events\OrderShipmentStatusUpdated;
use App\Http\Controllers\ClassifiedCloseContactController;
use App\Http\Controllers\ClinicAccountController;
use App\Http\Controllers\ClinicNotificationController;
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\HealthDeclarationController;
use App\Http\Controllers\HealthFormController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StationAccountController;
use App\Http\Controllers\UserAccountController;
use App\Http\Controllers\VisitedLocationRecordController;
use App\Models\ClassifiedAsContact;
use App\Models\ClinicAccount;
use App\Models\ClinicNotification;
use App\Models\StationAccount;
use App\Models\UserAccount;
use App\Models\UserResponse;
use App\Models\VisitedLocationRecord;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('image', function (Request $request) {
    $check = $request->hasFile('image');
    return response(['data' => $request->name, 'check' => $check, 'ext' => $request->image->extension()]);
});

Route::get('check-user/{stationId}/{resultId}', function (Request $request, $stationId, $resultId) {
    $user = UserAccount::query()->with(['userPatient' => function ($q) use ($resultId) {
        $q->where('user_account_id', $resultId)->where('isActive', 1);
    }, 'userTagged' => function ($q) use ($resultId) {
        $q->where('user_account_id', $resultId)->where('isActive', 1);
    }])->withExists(['userResponse' => function ($q) use ($resultId) {
        $q->where('user_account_id', $resultId)->whereDate('created_at', Carbon::now()->toDateString());
    }])->where('id', $resultId)->first();

    // $respond = ['form' => UserResponse::where('user_account_id',$resultId)->whereDate('created_at',Carbon::now()->toDateString())->exists()];

    if (UserResponse::where('user_account_id', $resultId)->whereDate('created_at', Carbon::now()->toDateString())->exists()) {
        VisitedLocationRecord::create(['location_id' => $stationId, 'user_account_id' => $resultId]);
    }

    return response()->json($user);
});

Route::post('register-user', [UserAccountController::class, 'store']);
Route::post('login-station', [StationAccountController::class, 'login']);
Route::post('login-clinic', [ClinicAccountController::class, 'login']);
Route::post('login-user', [UserAccountController::class, 'login']);
Route::post('submit', [HealthFormController::class, "submit"]);


// HOsting check server
Route::get('check', function () {
    return response()->json(['data' => 'TESTING HOST']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user-station', function (Request $request) {
        return response()->json(['data' => StationAccount::with('location')->where('id', $request->user()->id)->first()]);
    });

    Route::get('user', function (Request $request) {
        $user = UserAccount::with(['classification'])->where('id', $request->user()->id)->first();
        return response(['data' => $user]);
    });

    Route::get('user-clinic', function (Request $request) {
        $user = ClinicAccount::with(['role'])->find($request->user()->id);
        return response(['data' => $user]);
    });

    Route::post('logout', function (Request $request) {
        $deleted = $request->user()->currentAccessToken()->delete();
        return response()->json(['data' => $deleted]);
    });


    Route::get('clinic-data', function (Request $request) {
        return response(['data' => $request->user()]);
    });

    //Location
    Route::get('get-location', [LocationController::class, 'show']);

    //user
    Route::prefix('user')->group(function () {
        Route::put('update/{id}', [UserAccountController::class, "update"]);
        Route::put('update-password', [UserAccountController::class, "changePassword"]);
        Route::post('follow-up', [FollowUpController::class, "storeFollowUp"]);
        Route::get('check-profile/{id}', [UserAccountController::class, "getProfile"]);
        Route::get('visited-log-record', [VisitedLocationRecordController::class, 'getUserRecord']);

        Route::get('notification-paginate',[ClinicNotificationController::class,'userPaginateNotification']);
        Route::get('notification-all',[ClinicNotificationController::class,'userNotificationAll']);
    });

    //clinic
    Route::prefix('clinic')->group(function () {
        Route::post('register-clinic', [ClinicAccountController::class, 'store']);
        Route::post('register-station', [StationAccountController::class, 'store']);
        Route::get('role', [RoleController::class, 'getRole']);
        Route::get('get-count', [ClinicAccountController::class, 'getCounts']);
        Route::get('get-approval', [ClinicAccountController::class, 'approvalList']);
        Route::get('staff', [ClinicAccountController::class, 'staffs']);
        Route::get('get-station', [StationAccountController::class, 'getStation']);
        Route::put('for-approval/{id}', [ClinicAccountController::class, 'approval']);
        Route::put('update-role/{id}', [ClinicAccountController::class, 'changeRole']);
        Route::put('update-status/{id}', [StationAccountController::class, 'changeStatus']);
        Route::delete('delete-clinic/{id}', [ClinicAccountController::class, 'delete']);
        Route::delete('delete-station/{id}', [StationAccountController::class, 'delete']);
        Route::get('visited-log-record', [VisitedLocationRecordController::class, 'getRecord']);
        Route::get('visited-log-record/{id}', [VisitedLocationRecordController::class, 'perStation']);
        Route::get('get-users', [UserAccountController::class, 'users']);
        Route::get('get-visited-location/{id}', [VisitedLocationRecordController::class, 'getVisitedLocation']);
        Route::post('get-filter-visited-location/{id}', [VisitedLocationRecordController::class, 'filterVisitedLocation']);
        Route::post('store-contact', [ClassifiedCloseContactController::class, 'asContact']);
        Route::post('store-contact-selected/{id}', [ClassifiedCloseContactController::class, 'selectedContact']);
        Route::get('get-patient', [ClassifiedCloseContactController::class, 'getPatient']);
        Route::get('get-contact/{id}', [ClassifiedCloseContactController::class, 'getTaggedContacts']);
        Route::delete('delete-contact/{id}', [ClassifiedCloseContactController::class, 'deleteTaggedContact']);
        Route::delete('delete-patient/{id}', [ClassifiedCloseContactController::class, 'deletePatientContact']);
        Route::put('update-tagged/{id}', [ClassifiedCloseContactController::class, 'updateTaggedDuration']);
        Route::put('update-patient/{id}', [ClassifiedCloseContactController::class, 'updatePatientDuration']);
        Route::get('all-follow-ups', [FollowUpController::class, 'allFollowUp']);

        // Generate Reports 
        Route::get('get-all-patient', [ClassifiedCloseContactController::class, 'getAllPatient']);
        Route::post('get-date-patients', [ClassifiedCloseContactController::class, 'getDatePatient']);
        // Searchs
        Route::get('station-search/{searchId}', [StationAccountController::class, 'stationSearch']);
        Route::get('staff-search/{searchId}', [ClinicAccountController::class, 'staffSearch']);
        Route::get('response-search/{searchId}', [HealthDeclarationController::class, 'responseSearch']);
        Route::get('user-search/{searchId}', [UserAccountController::class, 'userSearch']);
        Route::get('patient-search/{searchId}', [UserAccountController::class, 'patientSearch']);
        Route::get('disease-search/{searchId}', [DiseaseController::class, 'diseaseSearch']);

        // Disease
        Route::get('disease', [DiseaseController::class, 'show']);
        Route::post('store-disease', [DiseaseController::class, 'store']);
        Route::put('update-disease/{id}', [DiseaseController::class, 'update']);
        Route::put('update-disease-status/{id}', [DiseaseController::class, 'updateStatus']);
        Route::delete('delete-disease/{id}', [DiseaseController::class, 'delete']);

        // Questionnaires
        Route::get('questionnaires', [QuestionnaireController::class, 'show']);
        Route::post('questionnaires', [QuestionnaireController::class, 'store']);
        Route::put('questionnaires/{id}', [QuestionnaireController::class, 'update']);
        Route::delete('questionnaires/{id}', [QuestionnaireController::class, 'delete']);
        
        // Edit Profile
        Route::post('edit-personal/{id}', [ClinicAccountController::class, 'editProfile']);
        Route::post('change-password/{id}', [ClinicAccountController::class, 'changePassword']);

        // Generate Taggeds
        Route::post('get-date-contacts', [ClassifiedCloseContactController::class, 'getDateTaggeds']);
        Route::post('get-all-contacts', [ClassifiedCloseContactController::class, 'getAllTagged']);

        Route::get('notification-paginate',[ClinicNotificationController::class,'paginateNotification']);
        Route::get('notification-all',[ClinicNotificationController::class,'notificationAll']);
    });
    
    // HD Form
    Route::get('get-all-response', [HealthDeclarationController::class, 'getAllResponses']);
    Route::get('get-response', [HealthDeclarationController::class, 'getResponses']);
    Route::get('check-status', [HealthDeclarationController::class, 'checkStatus']);
    Route::get('get-form', [HealthDeclarationController::class, 'getQuestions']);
    Route::get('get-user-response/{id}', [HealthDeclarationController::class, 'getUserForm']);
    Route::get('check-user-response', [HealthDeclarationController::class, 'checkUserForm']);
    Route::post('submit-form', [HealthDeclarationController::class, 'submitForm']);
    Route::post('get-date-response', [HealthDeclarationController::class, 'getDateResponse']);

    Route::prefix('station')->group(function () {
        Route::get('get-visitor-station', [VisitedLocationRecordController::class, 'stationVisited']);

        Route::post('match', [StationAccountController::class, 'matchUser']);
        Route::post('get-visitor', [VisitedLocationRecordController::class, 'visited']);
        Route::post('get-daily-visit', [VisitedLocationRecordController::class, 'dailyVisit']);
    });

    //FollowUps
    Route::get('get-follow-up', [FollowUpController::class, 'getFollowUps']);
    Route::get('check-followup', [FollowUpController::class, 'checkFollowUp']);
    Route::get('followup-exist', [FollowUpController::class, 'userFollowUp']);
    Route::post('submit-follow-up', [FollowUpController::class, 'submitFollowUp']);

    // Notifications 
    Route::get('clinic-notifications',[NotificationController::class,'show']);
    Route::get('user-notifications',[NotificationController::class,'userShow']);

    // User Details
    Route::get('user-details/{id}',[UserAccountController::class,'userDetails']);
});
