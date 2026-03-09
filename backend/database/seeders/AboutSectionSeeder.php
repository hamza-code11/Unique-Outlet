<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AboutSection;

class AboutSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run(): void
    {
        AboutSection::create([
            'badge' => 'ABOUT US',
            'heading' => "Passionate About\nQuality & Innovation",
            'paragraph' => "We are dedicated to delivering premium vaping products designed for performance, safety, and satisfaction. Our store offers a carefully curated collection of devices and accessories that combine modern technology with elegant design.

Whether you're new to vaping or an experienced enthusiast, our mission is to provide reliable products, trusted quality, and exceptional customer support that makes your experience smooth and enjoyable.",
            'years' => '10+',
            'customers' => '50k+',
            'products' => '500+',
            'support' => '24/7',
            'image' => 'about/about.png'
        ]);
    }
}
