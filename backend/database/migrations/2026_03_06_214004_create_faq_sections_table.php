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
        Schema::create('faq_sections', function (Blueprint $table) {
            $table->id();

                    $table->string('image');
        $table->string('badge')->nullable();
        $table->string('heading');

        $table->string('question1');
        $table->text('answer1');

        $table->string('question2');
        $table->text('answer2');

        $table->string('question3');
        $table->text('answer3');

        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faq_sections');
    }
};
