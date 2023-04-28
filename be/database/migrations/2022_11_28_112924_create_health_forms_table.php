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
        Schema::create('health_forms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_account_id')
            ->constrained('user_accounts')
            ->cascadeOnUpdate()
            ->cascadeOnDelete();
            $table->string('question');
            $table->string('answer');
            $table->string('by_order')->nullable();
            $table->timestamp('added_at')->nullable();
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
        Schema::dropIfExists('health_forms');
    }
};
