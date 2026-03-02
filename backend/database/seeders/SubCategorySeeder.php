<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Str;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
public function run(): void
{
    $vapes = Category::where('slug', 'vapes')->first();
    $mobile = Category::where('slug', 'mobile-accessories')->first();

    $vapeSubs = [
        "Mega Pro Pods 40K (RockMe) - Foger Compatible",
        "Mega Pro Kits 40K (RockMe) - Foger Compatible",
        "Rock me 30K Disposable Flavors",
        "Lost Mary 35K Turbo Flavors",
        "Foger 30K Pods Flavors",
        "Foger 30K Kit Flavors",
        "Geek Bar PulseX 25K Flavors",
        "Geek Bar Pulse 15K Flavors",
    ];

    foreach ($vapeSubs as $name) {
        SubCategory::create([
            'category_id' => $vapes->id,
            'name' => $name,
            'slug' => Str::slug($name),
        ]);
    }

    $mobileSubs = [
        "Fast Charging Cables",
        "Wireless Chargers",
        "Mobile Back Covers",
        "Power Banks",
        "Bluetooth Earbuds",
        "Car Mobile Holders",
    ];

    foreach ($mobileSubs as $name) {
        SubCategory::create([
            'category_id' => $mobile->id,
            'name' => $name,
            'slug' => Str::slug($name),
        ]);
    }
}
}
