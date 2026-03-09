<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PaymentSection;

class PaymentSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PaymentSection::create([
            'shipping_charges' => '2',
            'bank_name' => 'HBL Bank',
            'account_title' => 'Unique Outlet',
            'account_number' => '12345678934692',
            'iban' => 'PK36SCBL0000001123456702',
            'qrcode_image' => 'payments/qrcode.png',
            'other' => null
        ]);
    }
}
