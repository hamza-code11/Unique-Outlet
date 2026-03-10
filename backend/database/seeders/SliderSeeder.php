<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Slider;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {

        Slider::create([
            'heading' => "Ride the Vapes of\nsmooth vaping updates",
            'paragraph' => "Premium Vapes vaping products curated for enthusiasts. Quality you can trust, support you deserve.",
            'image' => "sliders/vapes.png",
            'offer_tag' => "Vapes COLLECTION • 25% OFF",
            'badge_product_name' => "Vapes",
            'badge_trusted_text' => "Trusted by 10,000+ Customers"
        ]);


        Slider::create([
            'heading' => "Upgrade your digital life\nwith premium accessories",
            'paragraph' => "Discover high quality mobile accessories designed for durability, performance and style.",
            'image' => "sliders/mobile.png",
            'offer_tag' => "MOBILE ACCESSORIES • 20% OFF",
            'badge_product_name' => "Mobile Accessories",
            'badge_trusted_text' => "Trusted by 8,000+ Customers"
        ]);


        Slider::create([
            'heading' => "Celebrate every season\nwith exclusive deals",
            'paragraph' => "Special seasonal products with amazing discounts. Limited time offers available now.",
            'image' => "sliders/seasonal.png",
            'offer_tag' => "SEASONAL SALE • 30% OFF",
            'badge_product_name' => "Seasonal Products",
            'badge_trusted_text' => "Trusted by 12,000+ Customers"
        ]);

    }
}
