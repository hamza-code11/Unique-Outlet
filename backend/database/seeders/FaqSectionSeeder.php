<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FaqSection;

class FaqSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FaqSection::create([
            'image' => 'faq/faq.png',
            'badge' => 'FAQ',
            'heading' => 'Frequently Asked Questions',

            'question1' => 'How long does shipping take?',
            'answer1' => 'Shipping usually takes 2-5 business days.',

            'question2' => 'Do you offer refunds?',
            'answer2' => 'Yes we offer refunds within 7 days.',

            'question3' => 'Is customer support available?',
            'answer3' => 'Our support team is available 24/7.'
        ]);
    }
}
