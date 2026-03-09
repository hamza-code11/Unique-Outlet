<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\InteractivePromo;


class InteractivePromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         InteractivePromo::create([

            'left_image' => 'interactive/left.jpg',
            'left_heading' => 'The Best E-Liquid Bundles',
            'left_paragraph' => 'Explore a wide range of vaping products with fast delivery and beginner-friendly guidance.',
            'left_button_text' => 'Shop Now',

            'right_top_image' => 'interactive/right-top.jpg',
            'right_top_heading' => 'New To Vaping?',
            'right_top_paragraph' => 'Learn how vaping works and choose the right starter kit.',
            'right_top_button_text' => 'Shop Now',

            'right_bottom_image' => 'interactive/right-bottom.jpg',
            'right_bottom_heading' => 'Vap Mode',
            'right_bottom_paragraph' => 'Discover advanced devices and customize your experience.',
            'right_bottom_button_text' => 'Shop Now'

        ]);
    }
}
