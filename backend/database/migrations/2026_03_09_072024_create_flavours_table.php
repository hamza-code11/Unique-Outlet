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
        Schema::create('flavours', function (Blueprint $table) {
            $table->id();

        $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
        $table->foreignId('subcategory_id')->constrained('sub_categories')->cascadeOnDelete();
        $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();

        $table->string('name');
        $table->string('slug')->unique(); // yaha change
        $table->text('desc')->nullable();
        $table->decimal('price',8,2);
        $table->integer('stock')->default(0);
        $table->string('image')->nullable();
    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flavours');
    }
};
