<?php

namespace Database\Seeders;

use App\Models\Questionnaire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = [
            ['question' => "Are you experiencing one (1) or more of the follow symptoms?", 
            'sub_question' => 'Fever(Lagnat),cough and/or colds (ubo at/o sipon),sore throat(pananakit ng lalamunan),body pains(pananakit ng katawan),loss of taste and/or smell(pagkawala ng panlasa at/o pangamoy),vomiting(pagsusuka),diarhea(pagtatae),difficulty of breathing(hirap huminga)'
            ,'required' => true,"type" => 'checkbox'],
            ['question' => "Have you had face-to-face contact with a probable or confirmed COVID-19 within 1 meter for more than 15 minutes for the past 14 days?(May nakasalamuha kana ba na probable o kumpirmadong pasyente na may COVID-19 mula sa isang metrong distansya or mas malapit pa at tumagal ng mahigit 15 minuto sa nakalipas na 14 araw?)",'required' => true,"type" => 'checkbox'],
            ['question' => "Have you provided direct care for a patient with probable or confirmed COVID-19 case without using proper personal protective equipment for the past 14 days?(Nag-alaga kaba ng probable o kumpirmadong pasyente na may COVID-19 ng hindi nakasout ng tamang personal protective equipment sa nakalipas na 14 araw?)",
            'required' => true, 'type' => 'checkbox'],
            ['question' => 'Have you  travelled outside the Philippines in the last 14 days? (Ikaw ba ay nagbyahe sa labas ng Pilipinas sa nakalipas na 14 na araw?)'
            ,'required' => true,'type' => 'checkbox'],
            ['question' => 'Have you travelled outside in the current city/municipality where you reside in the past 14 days?(Ikaw ba ay nagbyahe sa labas  ng iyong lungsod/munisipyo sa nakalipas na 14 araw?)',
            'required' => true, 'type' => 'checkbox']
        ];

        foreach($questions as $question){
            Questionnaire::create($question);
        }
    }
}
