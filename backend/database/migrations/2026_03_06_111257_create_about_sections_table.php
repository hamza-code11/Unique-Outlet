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
        Schema::create('about_sections', function (Blueprint $table) {
            $table->id();
        $table->string('badge')->nullable();
        $table->string('heading');
        $table->text('paragraph');
        $table->string('years');
        $table->string('customers');
        $table->string('products');
        $table->string('support');
                $table->string('image');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_sections');
    }
};
