<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CheckoutOrder;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required',
        'phone' => 'required',
        'country' => 'required',
        'street_address' => 'required',
        'town_city' => 'required',
        'postcode' => 'required',
        'products' => 'required|array'
    ]);

    // Order Save
    $order = CheckoutOrder::create([
        'user_id' => Auth::id(),
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $request->phone,
        'country' => $request->country,
        'street_address' => $request->street_address,
        'town_city' => $request->town_city,
        'postcode' => $request->postcode,
    ]);

    // Order Items Save
    foreach ($request->products as $item) {
        OrderItem::create([
            'checkout_order_id' => $order->id,
            'product_id' => $item['id'],
            'product_name' => $item['name'],
            'price' => $item['price'],
            'quantity' => $item['quantity']
        ]);
    }

    return response()->json([
        'message' => 'Order placed successfully'
    ]);
}



public function show($id)
{
    $order = CheckoutOrder::with('order_items')->findOrFail($id);

    return response()->json([
        'success' => true,
        'order' => $order
    ]);
}




}
