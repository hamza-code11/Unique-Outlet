<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFooterSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('footer_settings', function (Blueprint $table) {
            $table->id();
            $table->json('data')->nullable();
            $table->timestamps();
        });

        // default row
        DB::table('footer_settings')->insert([
            'data' => json_encode([]),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('footer_settings');
    }
}