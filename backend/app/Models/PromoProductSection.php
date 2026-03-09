<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoProductSection extends Model
{

    protected $table = 'promo_product_sections';
    
protected $fillable = [
    'badge',
    'heading',
    'paragraph',
    'price',
    'feature_one',
    'feature_two',
    'feature_three',
    'button_text',
    'image'
];


}
