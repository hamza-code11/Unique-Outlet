<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PromoProductSection;

class PromoProductSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PromoProductSection::create([
            'badge' => 'Best Seller',
            'heading' => 'Organic Menthol Balm',
            'paragraph' => 'Experience instant cooling relief with our 100% natural menthol balm made from premium organic ingredients.',
            'price' => '19.99',

            'feature_one' => '100% Natural',
            'feature_two' => 'Fresh Menthol',
            'feature_three' => '30 Day Refund',

            'button_text' => 'Shop Now',
            'image' => 'promo-products/menthol-balm.png'
        ]);
    }
}
