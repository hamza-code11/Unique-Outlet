<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = [
    'brand_name',
    'description',
    'location',
    'contact',
    'gmail',
    'newsletter_desc'
];
}