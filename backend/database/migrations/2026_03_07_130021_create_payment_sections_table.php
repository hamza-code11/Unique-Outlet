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
        Schema::create('payment_sections', function (Blueprint $table) {
            $table->id();

                    $table->string('shipping_charges');
        $table->string('bank_name');
        $table->string('account_title');
        $table->string('account_number');
        $table->string('iban');
        $table->string('qrcode_image');
        $table->text('other')->nullable();

        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_sections');
    }
};
