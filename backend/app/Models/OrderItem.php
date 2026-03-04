<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
    'checkout_order_id',
    'product_id',
    'product_name',
    'price',
    'quantity'
];

// public function order()
// {
//     return $this->belongsTo(CheckoutOrder::class);
// }


public function order()
{
    return $this->belongsTo(CheckoutOrder::class, 'checkout_order_id');
}


}
