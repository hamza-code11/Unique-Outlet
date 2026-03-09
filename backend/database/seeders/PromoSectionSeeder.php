<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PromoSection;

class PromoSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PromoSection::create([
            'badge' => 'PROMO',
            'heading' => 'Limited Offer',
            'paragraph' => 'Our vape shop is not only a variety of vaping products, but also an operational support service that ensures quality, reliability, and customer satisfaction.',
            'feature_one' => 'Premium Quality',
            'feature_two' => 'Limited Time',
            'customers' => 'Join 5k+ happy customers',
            'image' => 'promo/promo.png'
        ]);
    }
}
