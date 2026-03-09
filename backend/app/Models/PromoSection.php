<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoSection extends Model
{
    protected $fillable = [
        'badge',
        'heading',
        'paragraph',
        'feature_one',
        'feature_two',
        'customers',
        'image'
    ];
}
