<?php
// app/Models/NavbarSetting.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NavbarSetting extends Model
{
    use HasFactory;

    // protected $table = 'navbar_settings';

protected $fillable = ['logo_image'];
}