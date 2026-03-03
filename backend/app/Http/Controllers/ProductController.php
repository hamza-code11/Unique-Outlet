<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductController extends Controller
{


public function index()
{
    return response()->json(
        Product::with(['category', 'subCategory'])->get()
    );
}

public function bySubCategory($subCategoryId)
{
    $products = Product::with(['category', 'subCategory'])
                ->where('sub_category_id', $subCategoryId)
                ->get();

    return response()->json($products);
}
    



public function store(Request $request)
{
    $request->validate([
        'category_id' => 'required',
        'sub_category_id' => 'required',
        'name' => 'required',
        'price' => 'required',
        'stock' => 'required',
        'images.*' => 'image|mimes:jpg,png,jpeg|max:2048'
    ]);

    $product = Product::create([
        'category_id' => $request->category_id,
        'sub_category_id' => $request->sub_category_id,
        'name' => $request->name,
        'slug' => Str::slug($request->name),
        'price' => $request->price,
        'brand_name' => $request->brand_name,
        'stock' => $request->stock,
        'description' => $request->description,
        'bottle_size' => $request->bottle_size,
        'specifications' => $request->specifications,
        'vendor_info' => $request->vendor_info,
        'status' => $request->status ?? 1,
    ]);

    // Image upload (max 6)
    if ($request->hasFile('images')) {
        $images = [];
        foreach ($request->file('images') as $index => $image) {
            if ($index >= 6) break;
            $path = $image->store('products', 'public');
            $images[] = $path;
        }

        $product->update([
            'image1' => $images[0] ?? null,
            'image2' => $images[1] ?? null,
            'image3' => $images[2] ?? null,
            'image4' => $images[3] ?? null,
            'image5' => $images[4] ?? null,
            'image6' => $images[5] ?? null,
        ]);
    }

    return response()->json($product);
}




public function update(Request $request, $id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $request->validate([
        'category_id' => 'required',
        'sub_category_id' => 'required',
        'name' => 'required',
        'price' => 'required',
        'stock' => 'required',
    ]);

    $product->update([
        'category_id' => $request->category_id,
        'sub_category_id' => $request->sub_category_id,
        'name' => $request->name,
        'slug' => Str::slug($request->name),
        'price' => $request->price,
        'brand_name' => $request->brand_name,
        'stock' => $request->stock,
        'description' => $request->description,
        'bottle_size' => $request->bottle_size,
        'specifications' => $request->specifications,
        'vendor_info' => $request->vendor_info,
        'status' => $request->status ?? 1,
    ]);

    // Images update (optional)
    if ($request->hasFile('images')) {
        $images = [];
        foreach ($request->file('images') as $index => $image) {
            if ($index >= 6) break;
            $path = $image->store('products', 'public');
            $images[] = $path;
        }

        $product->update([
            'image1' => $images[0] ?? $product->image1,
            'image2' => $images[1] ?? $product->image2,
            'image3' => $images[2] ?? $product->image3,
            'image4' => $images[3] ?? $product->image4,
            'image5' => $images[4] ?? $product->image5,
            'image6' => $images[5] ?? $product->image6,
        ]);
    }

    return response()->json($product);
}


// ProductController.php - line 138 ke around
public function show($id)
{
    try {
        $product = Product::with(['category', 'subcategory']) // ✅ 'sub_category' nahi, 'subcategory' likho
                        ->find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        
        return response()->json($product);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}



public function destroy($id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json([
            'message' => 'Product not found'
        ], 404);
    }

    // Delete images (optional but professional)
    for ($i = 1; $i <= 6; $i++) {
        $image = $product->{'image' . $i};
        if ($image && file_exists(storage_path('app/public/' . $image))) {
            unlink(storage_path('app/public/' . $image));
        }
    }

    $product->delete();

    return response()->json([
        'message' => 'Product deleted successfully'
    ]);
}




public function productsBySubCategorySlug($slug)
{
    $products = Product::with(['category', 'subCategory'])
        ->whereHas('subCategory', function ($query) use ($slug) {
            $query->where('slug', $slug);
        })
        ->get();

    return response()->json($products);
}
}
