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
        Schema::create('promo_features_sections', function (Blueprint $table) {
            $table->id();

                    $table->string('image');
        $table->string('badge')->nullable();
        $table->string('heading');
        $table->text('paragraph');
        $table->string('button_text');

        $table->string('feature_one_heading');
        $table->text('feature_one_paragraph');

        $table->string('feature_two_heading');
        $table->text('feature_two_paragraph');

        $table->string('feature_three_heading');
        $table->text('feature_three_paragraph');

        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_features_sections');
    }
};
