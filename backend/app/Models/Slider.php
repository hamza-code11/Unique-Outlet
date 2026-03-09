<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'heading',
        'paragraph',
        'image',
        'offer_tag',
        'badge_product_name',
        'badge_trusted_text'
    ];
}
