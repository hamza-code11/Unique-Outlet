<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
        protected $fillable = [
        'badge',
        'heading',
        'paragraph',
        'years',
        'customers',
        'products',
        'support',
        'image'
    ];
}
