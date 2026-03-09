<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContactSection;

class ContactSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactSection::create([
            'badge' => 'Contact Us',
            'heading' => 'Get in Touch',
            'paragraph' => 'Feel free to contact us anytime',
            'address' => '123 Main Street, New York',
            'phone' => '+1 234 567 890',
            'email' => 'support@vape.com',
            'customer_support' => '24/7 Customer Support',
            'map_location' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52859625.8737515!2d-161.6458215068694!3d36.03749288732443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1772887278885!5m2!1sen!2s'
        ]);
    }
}

