<?php
// database/migrations/2024_01_01_000001_create_navbar_settings_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNavbarSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('navbar_settings', function (Blueprint $table) {
            $table->id();
            $table->string('logo_image')->nullable();
            $table->timestamps();
        });

        // Insert default record
        DB::table('navbar_settings')->insert([
            'logo_image' => null,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('navbar_settings');
    }
}