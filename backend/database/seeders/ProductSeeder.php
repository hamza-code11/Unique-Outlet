<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // ==============================
        // ===== Vapes Products ======
        // ==============================
        $vapes = Category::where('slug', 'vapes')->first();

        $products = [
            'Mega Pro Pods 40K (RockMe) - Foger Compatible' => [
                'Blackberry B Pop', 'Watermelon Ice', 'Strawberry Watermelon',
                'Blue Rancher', 'Crazy Lemon', 'Miami Mint',
                'Tropical Rainbow Blast', 'Sour Mango Pineapple', 'Grape Ice',
                'Pineapple Coconut', 'Blueberry Watermelon', 'Fcuking Fab',
                'Cool Mint', 'Strawberry Ice', 'Frozen Watermelon'
            ],

            'Mega Pro Kits 40K (RockMe) - Foger Compatible' => [
                'Blackberry B Pop', 'Watermelon Ice', 'Strawberry Watermelon',
                'Blue Rancher', 'Crazy Lemon', 'Miami Mint',
                'Tropical Rainbow Blast', 'Sour Mango Pineapple', 'Grape Ice',
                'Pineapple Coconut', 'Blueberry Watermelon', 'Fcuking Fab',
                'Cool Mint', 'Strawberry Ice', 'Frozen Watermelon'
            ],

            'Rock me 30K Disposable Flavors' => [
                'Blackberry B Pop', 'Watermelon Ice', 'Strawberry B-Pop',
                'Blue Razz Ice', 'Cherry Lemon', 'Miami Mint',
                'Rropical Rainbow Blast', 'White Gummy', 'Kiwi Strawberry',
                'Sour Mango Pineapple', 'Orange Fcuking Fab',
                'Rasberry Peach Lime', 'Cool Mint',
                'White Peach Raspberry', 'Grape Ice'
            ],

            'Lost Mary 35K Turbo Flavors' => [
                'Pink Lemonade', 'Scary Berry', 'Strawberry',
                'Tiger Blood', 'White Gemi', 'Strawberry Kiwi',
                'Blackberry Blueberry', 'Pineapple Lime', 'Black Mint',
                'Watermelon', 'Baja Splash', 'Blue Razz Ice',
                'Orange Passion Mango', 'Rocket Freeze', 'Toasted Banana',
                'Berry Burst', 'Strawmelon Peach', 'Summer Grape',
                'Winter Mint', 'Black Razz Lemon', 'Kiwi Passion Fruit',
                'Mountain Berry', 'Sunny Orange', 'Golden Berry'
            ],

            'Foger 30K Pods Flavors' => [
                'Juicy Peach Ice', 'Strawberry Watermelon', 'Cool Mint',
                'Blue Razz Ice', 'Strawberry Ice', 'Gummy Bear',
                'White Gummy', 'Sour Apple Ice', 'Watermelon Ice',
                'Blueberry Watermelon', 'Strawberry Banana',
                'Watermelon Bubblegum', 'Strawberry Kiwi',
                'Blue Rancher B-Pop', 'Pineapple Coconut', 'Miami Mint',
                'Kiwi Dragon Berry', 'Strawberry B-Pop', 'Cherry Bomb',
                'Sour Fcuking Fab', 'Strawberry Cupcake'
            ],

            'Foger 30K Kit Flavors' => [
                'Gummy Bear', 'Strawberry Blow Pop', 'Strawberry Banana',
                'Pink Lemonade', 'Pink & Blue', 'Meta Moon',
                'Kiwi Dragon Berry', 'Sour Fucking Fab', 'Cool Mint',
                'Sour Apple Ice', 'Blue Rancher B-Pop', 'Watermelon Ice',
                'Blue Razz Ice', 'Juicy Peach Ice', 'Blueberry Watermelon',
                'Strawberry Cupcake', 'Miami Mint'
            ],

            'Geek Bar PulseX 25K Flavors' => [
                'Blackberry Blueberry', 'Dualicious', 'Miami Mint',
                'Orange Mint', 'Pink & Blue', 'Peach Jam',
                'Pink Berry lemonade', 'Pears of Thieves', 'Starwberry B Burst',
                'Wild Cherry Slush', 'Blue Ranchers', 'Blue Razz Ice',
                'Grape Slush', 'Orange Dragon', 'Sour Apple Ice',
                'Strawberry Colada', 'Strawberry Dragon', 'Sour Straws',
                'Strawberry Watermelon', 'Watermelon Ice',
                'Sour Mango Pineapple', 'Strawberry Jam',
                'Sour Fcuking Fab', 'Strawberry Kiwi Ice',
                'Cool Mint', 'Blueberry Jam'
            ],

            'Geek Bar Pulse 15K Flavors' => [
                'Blue Razz Ice', 'Dragon Melon', 'Fcuking Fab',
                'Juicy Peach Ice', 'Mexico Mango', 'Miami Mint',
                'Strawberry Banana', 'White Gummy Ice', 'Black Cherry',
                'Cherry Bomb', 'California Cherry', 'Icey Mintz',
                'Meta Moon', 'Pineapple Savers', 'Punch',
                'Raspberry Watermelon', 'Sour Apple Ice', 'Sour Blue Dust',
                'Sour Gush', 'Strawberry Kiwi', 'Stone Mintz',
                'Sour Strawberry', 'Watermelon Ice', 'Black Mintz',
                'Frozen Pina Colada', 'Frozen White Grape',
                'Frozen Strawberry', 'Banana Ice', 'Omg B Burst',
                'Blueberry watermelon', 'Berry Bliss', 'Peach Lemonade'
            ],
        ];

        foreach ($products as $productName => $flavors) {
            foreach ($flavors as $flavor) {
                $sub = SubCategory::where('category_id', $vapes->id)
                    ->where('name', 'like', "%$productName%")
                    ->first();

                Product::create([
                    'category_id' => $vapes->id,
                    'sub_category_id' => $sub?->id,
                                    'brand_name' => 'Rock Me',
                    'name' => $productName . ' - ' . $flavor,
                    'slug' => Str::slug($productName . '-' . $flavor),
                    'price' => rand(10, 100),
                    'stock' => rand(10, 200),
                    'description' => $productName . ' premium flavor: ' . $flavor,
                    'bottle_size' => '30ml',
                    'specifications' => [
                        'flavor' => $flavor,
                        'puffs' => '40000',
                        'nicotine' => '5%',
                        'type' => 'Disposable'
                    ],
                    'vendor_info' => [
                        'vendor' => 'RockMe',
                        'country' => 'USA'
                    ],
                    'status' => 1
                ]);
            }
        }

        // ==============================
        // ===== Mobile Accessories =====
        // ==============================
        $mobile = Category::where('slug', 'mobile-accessories')->first();

        $mobileProducts = [
            ['fast-charging-cables', 'USB-C Fast Charging Cable'],
            ['fast-charging-cables', 'Lightning Fast Charging Cable'],
            ['fast-charging-cables', 'Type-C Nylon Fast Cable'],

            ['wireless-chargers', '15W Wireless Charger Pad'],
            ['wireless-chargers', '20W Fast Wireless Charging Pad'],

            ['mobile-back-covers', 'Silicone Mobile Back Cover'],
            ['mobile-back-covers', 'Matte Finish Back Cover'],

            ['power-banks', '10000mAh Fast Charging Power Bank'],
            ['power-banks', '20000mAh High Capacity Power Bank'],

            ['bluetooth-earbuds', 'TWS Bluetooth Earbuds Pro'],
            ['bluetooth-earbuds', 'Bass Boost Bluetooth Earbuds'],

            ['car-mobile-holders', 'Magnetic Car Mobile Holder'],
            ['car-mobile-holders', 'Air Vent Car Mobile Holder'],
        ];

        foreach ($mobileProducts as $item) {
            [$slug, $name] = $item;
            $sub = SubCategory::where('slug', $slug)->first();

            Product::create([
                'category_id' => $mobile->id,
                'sub_category_id' => $sub?->id,
                'name' => $name,
                'slug' => Str::slug($name),
                'brand_name' => 'Rock Me',
                'price' => rand(5, 50),
                'stock' => rand(20, 300),
                'description' => $name . ' premium quality accessory.',
                'status' => 1
            ]);
        }
    }
}