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
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->foreignId('category_id')->constrained()->onDelete('cascade');
        $table->foreignId('sub_category_id')->constrained('sub_categories')->onDelete('cascade');

        $table->string('name');
        $table->string('slug')->unique();
        $table->decimal('price', 10, 2);
        $table->string('brand_name');
        $table->integer('stock');
        $table->text('description')->nullable();
        $table->string('bottle_size')->nullable();

        $table->json('specifications')->nullable();
        $table->json('vendor_info')->nullable();
        $table->boolean('status')->default(1);

        // Images (6 images)
        $table->string('image1')->nullable();
        $table->string('image2')->nullable();
        $table->string('image3')->nullable();
        $table->string('image4')->nullable();
        $table->string('image5')->nullable();
        $table->string('image6')->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
