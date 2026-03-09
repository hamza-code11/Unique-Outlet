<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PromoFeaturesSection;

class PromoFeaturesSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PromoFeaturesSection::create([
            'image' => 'promo-features/features.png',
            'badge' => 'New',
            'heading' => 'Try our new taste',
            'paragraph' => 'Our vape shop is not only a variety of vaping products, but also an operational support service.',
            'button_text' => 'Shop Now',

            'feature_one_heading' => 'No dangerous toxins',
            'feature_one_paragraph' => 'We offer a wide range of quality vaping products',

            'feature_two_heading' => 'Feel of menthol',
            'feature_two_paragraph' => 'We offer a wide range of quality vaping products',

            'feature_three_heading' => 'Safer than smoking',
            'feature_three_paragraph' => 'We offer a wide range of quality vaping products'
        ]);
    }
}
