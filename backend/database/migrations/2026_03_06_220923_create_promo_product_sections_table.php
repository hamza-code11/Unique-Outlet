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
        Schema::create('promo_product_sections', function (Blueprint $table) {
            $table->id();
            
            $table->string('image');
        $table->string('badge')->nullable();
        $table->string('heading');
        $table->text('paragraph');
        $table->string('price');

        $table->string('feature_one')->nullable();
        $table->string('feature_two')->nullable();
        $table->string('feature_three')->nullable();

        $table->string('button_text')->nullable();
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_product_sections');
    }
};
