<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_response_id')
                ->constrained('user_responses')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('questionnaire_id')
                ->constrained('questionnaires')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
                $table->boolean('answer');
                // $table->string('answer');
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answers');
    }
};
