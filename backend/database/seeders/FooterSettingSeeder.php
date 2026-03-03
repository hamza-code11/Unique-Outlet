<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FooterSetting;

class FooterSettingSeeder extends Seeder
{
    public function run()
    {
        FooterSetting::create([
            'brand_name' => 'Unique Outlet',
            'description' => 'Best vaping and mobile accessories store with premium quality products.',
            'location' => 'Karachi, Pakistan',
            'contact' => '+92 300 1234567',
            'gmail' => 'support@uniqueoutlet.com',
            'newsletter_desc' => 'Subscribe to our newsletter for latest updates and offers.'
        ]);
    }
}
