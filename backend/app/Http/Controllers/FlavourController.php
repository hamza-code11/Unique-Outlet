<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flavour;
use Illuminate\Support\Str;

class FlavourController extends Controller
{
    

public function store(Request $request)
{
    $request->validate([
        'category_id' => 'required',
        'subcategory_id' => 'required',
        'product_id' => 'required',
        'name' => 'required',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'image' => 'nullable|image|mimes:jpg,png,jpeg,webp|max:2048',
    ]);

    $imagePath = null;

    if($request->hasFile('image')){
        $imagePath = $request->file('image')->store('flavours','public');
    }

    $flavour = Flavour::create([
        'category_id' => $request->category_id,
        'subcategory_id' => $request->subcategory_id,
        'product_id' => $request->product_id,
        'name' => $request->name,
        'slug' => Str::slug($request->name), // automatic slug
        'desc' => $request->desc,
        'price' => $request->price,
        'stock' => $request->stock,
        'image' => $imagePath
    ]);

    return response()->json([
        'success'=>true,
        'data'=>$flavour
    ]);
}








public function update(Request $request, $id)
{
    $flavour = Flavour::findOrFail($id);

    $request->validate([
        'category_id' => 'required',
        'subcategory_id' => 'required',
        'product_id' => 'required',
        'name' => 'required',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'image' => 'nullable|image|mimes:jpg,png,jpeg,webp|max:2048',
    ]);

    $imagePath = $flavour->image;

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('flavours', 'public');
    }

    $flavour->update([
        'category_id' => $request->category_id,
        'subcategory_id' => $request->subcategory_id,
        'product_id' => $request->product_id,
        'name' => $request->name,
        'slug' => Str::slug($request->name),
        'desc' => $request->desc,
        'price' => $request->price,
        'stock' => $request->stock,
        'image' => $imagePath
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Flavour updated successfully',
        'data' => $flavour
    ]);
}







public function index()
{
    $flavours = Flavour::with(['category','subcategory','product'])->get();

    return response()->json([
        'success'=>true,
        'flavours'=>$flavours
    ]);
}






    public function productFlavours($id)
    {
        $flavours = Flavour::where('product_id', $id)->get();

        return response()->json([
            'success' => true,
            'flavours' => $flavours
        ]);
    }


    

}
