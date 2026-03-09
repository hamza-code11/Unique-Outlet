<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoFeaturesSection extends Model
{
    

    protected $fillable = [
'image',
'badge',
'heading',
'paragraph',
'button_text',

'feature_one_heading',
'feature_one_paragraph',

'feature_two_heading',
'feature_two_paragraph',

'feature_three_heading',
'feature_three_paragraph'
];


}
