<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InteractivePromo extends Model
{
    protected $fillable = [

'left_image',
'left_heading',
'left_paragraph',
'left_button_text',

'right_top_image',
'right_top_heading',
'right_top_paragraph',
'right_top_button_text',

'right_bottom_image',
'right_bottom_heading',
'right_bottom_paragraph',
'right_bottom_button_text',

];

}
