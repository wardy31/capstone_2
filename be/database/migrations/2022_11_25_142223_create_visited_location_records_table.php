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
        Schema::create('visited_location_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_account_id')
                ->constrained('user_accounts')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('location_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->time('time_in')->nullable();
            $table->time('time_out')->nullable();
            $table->string('time_duration')->nullable();
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
        Schema::dropIfExists('visited_location_records');
    }
};
