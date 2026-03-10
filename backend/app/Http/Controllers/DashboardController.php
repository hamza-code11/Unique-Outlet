<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use App\Models\OrderItem;

class DashboardController extends Controller
{
    

    // app/Http/Controllers/DashboardController.php
public function stats()
{
    $currentMonth = now()->month;
    $previousMonth = now()->subMonth()->month;
    
    $totalSales = Order::sum('total_amount');
    $previousSales = Order::whereMonth('created_at', $previousMonth)->sum('total_amount');
    
    $totalOrders = Order::count();
    $previousOrders = Order::whereMonth('created_at', $previousMonth)->count();
    
    $totalProducts = Product::count();
    $totalCustomers = User::count();
    
    $salesChange = $previousSales > 0 
        ? round(($totalSales - $previousSales) / $previousSales * 100, 1)
        : ($totalSales > 0 ? 100 : 0);
    
    $ordersChange = $previousOrders > 0
        ? round(($totalOrders - $previousOrders) / $previousOrders * 100, 1)
        : ($totalOrders > 0 ? 100 : 0);
    
    return response()->json([
        'success' => true,
        'stats' => [
            'total_sales' => $totalSales,
            'total_orders' => $totalOrders,
            'total_products' => $totalProducts,
            'total_customers' => $totalCustomers,
            'changes' => [
                'sales' => $salesChange,
                'orders' => $ordersChange
            ]
        ]
    ]);
}





// app/Http/Controllers/ProductController.php
// public function topSelling()
// {
//     $products = Product::withCount('orderItems as total_sold')
//         ->withSum('orderItems as total_revenue', 'price * quantity')
//         ->orderBy('total_sold', 'desc')
//         ->limit(5)
//         ->get();
    
//     return response()->json([
//         'success' => true,
//         'products' => $products
//     ]);
// }



}
