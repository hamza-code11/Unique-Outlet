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
        Schema::create('interactive_promos', function (Blueprint $table) {
            $table->id();

            // Left Big Card
        $table->string('left_image');
        $table->string('left_heading');
        $table->text('left_paragraph');
        $table->string('left_button_text');

        // Right Top Card
        $table->string('right_top_image');
        $table->string('right_top_heading');
        $table->text('right_top_paragraph');
        $table->string('right_top_button_text');

        // Right Bottom Card
        $table->string('right_bottom_image');
        $table->string('right_bottom_heading');
        $table->text('right_bottom_paragraph');
        $table->string('right_bottom_button_text');

        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interactive_promos');
    }
};
