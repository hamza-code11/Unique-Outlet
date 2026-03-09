<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSection extends Model
{
    

 protected $fillable = [
        'badge',
        'heading',
        'paragraph',
        'address',
        'phone',
        'email',
        'customer_support',
        'map_location'
    ];


    
}
