<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CheckoutOrder;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{


public function allOrders()
{
    $orders = CheckoutOrder::with('order_items')
        ->select('id', 'user_id', 'name', 'email', 'phone', 'created_at', 'status')
        ->orderBy('id', 'desc')
        ->get()
        ->map(function($order) {
            return [
                'id' => $order->id,
                'user_id' => $order->user_id,
                'name' => $order->name,
                'email' => $order->email,
                'phone' => $order->phone,
                'date' => $order->created_at->format('Y-m-d'),
                'status' => $order->status,
                'total_amount' => $order->order_items->sum(function($item) {
                    return $item->price * $item->quantity;
                }),
                'items' => $order->order_items
            ];
        });

    return response()->json([
        'success' => true,
        'orders' => $orders
    ]);
}

public function getOrder($id)
{
    $order = CheckoutOrder::with('order_items')->find($id);
    
    if (!$order) {
        return response()->json([
            'success' => false,
            'message' => 'Order not found'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'order' => $order
    ]);
}





// app/Http/Controllers/CheckoutController.php
public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:pending,processing,shipped,completed,cancelled'
    ]);

    $order = CheckoutOrder::find($id);
    
    if (!$order) {
        return response()->json([
            'success' => false,
            'message' => 'Order not found'
        ], 404);
    }

    $order->status = $request->status;
    $order->save();

    return response()->json([
        'success' => true,
        'message' => 'Order status updated successfully',
        'order' => $order
    ]);
}



/////////////////////////// close admin



    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'country' => 'required|string|max:100',
                'street_address' => 'required|string|max:255',
                'town_city' => 'required|string|max:100',
                'postcode' => 'required|string|max:20',
                'products' => 'required|array|min:1',
                'products.*.id' => 'required|integer|exists:products,id',
                'products.*.name' => 'required|string',
                'products.*.price' => 'required|numeric|min:0',
                'products.*.quantity' => 'required|integer|min:1'
            ]);

            DB::beginTransaction();

            // Order Save with user_id
            $order = CheckoutOrder::create([
                'user_id' => Auth::id() ?? $request->user_id ?? 1, // Fallback to 1 if no auth
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'country' => $request->country,
                'street_address' => $request->street_address,
                'town_city' => $request->town_city,
                'postcode' => $request->postcode,
                'status' => 'pending' // Default status
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

            DB::commit();

            // Load the order with its items for response
            $order->load('order_items');

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order' => $order
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to place order: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $order = CheckoutOrder::with('order_items')
                        ->where('id', $id)
                        ->first();

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found'
                ], 404);
            }

            // Optional: Add authorization check
            // if (Auth::id() !== $order->user_id && !Auth::user()?->is_admin) {
            //     return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
            // }

            return response()->json([
                'success' => true,
                'order' => $order
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch order: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getLatestOrder($userId)
    {
        try {
            $order = CheckoutOrder::with('order_items')
                        ->where('user_id', $userId)
                        ->latest()
                        ->first();

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'No orders found for this user'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'order' => $order
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch latest order: ' . $e->getMessage()
            ], 500);
        }
    }






    // order history chek 
public function userOrders()
{
    $userId = auth()->id();

    $orders = CheckoutOrder::with('order_items')
        ->where('user_id', $userId)
        ->orderBy('id', 'desc')
        ->get();

    return response()->json([
        'success' => true,
        'orders' => $orders
    ]);
}




public function orderById($id)
{
    $order = CheckoutOrder::with('order_items')
        ->where('id', $id)
        ->where('user_id', auth()->id())
        ->first();

    if (!$order) {
        return response()->json([
            'success' => false,
            'message' => 'Order not found'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'order' => $order
    ]);
}   


}



