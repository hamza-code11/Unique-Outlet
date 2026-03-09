<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentSection extends Model
{


    protected $fillable = [
    'shipping_charges',
    'bank_name',
    'account_title',
    'account_number',
    'iban',
    'qrcode_image',
    'other'
];


}
