<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckoutOrder extends Model
{
    protected $fillable = [
    'user_id',
    'name',
    'email',
    'phone',
    'country',
    'street_address',
    'town_city',
    'postcode'
];

// public function items()
// {
//     return $this->hasMany(OrderItem::class);
// }

// public function order_items()
// {
//     return $this->hasMany(OrderItem::class, 'order_id');
// }

public function order_items()
{
    return $this->hasMany(OrderItem::class, 'checkout_order_id');
}

}
