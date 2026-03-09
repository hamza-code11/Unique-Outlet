<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sliders', function (Blueprint $table) {
            $table->id();
        $table->string('heading');
        $table->text('paragraph');
        $table->string('image');
        $table->string('offer_tag')->nullable();
        $table->string('badge_product_name')->nullable();
        $table->string('badge_trusted_text')->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sliders');
    }
};
