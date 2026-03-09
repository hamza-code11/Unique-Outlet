<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PromoProductSection;
use Illuminate\Support\Facades\Storage;


class PromoProductSectionController extends Controller
{
    



public function index()
{
    return response()->json([
        'success' => true,
        'promo_product' => PromoProductSection::first()
    ]);
}




public function store(Request $request)
{
    $request->validate([
        'badge' => 'nullable',
        'heading' => 'required',
        'paragraph' => 'required',
        'price' => 'required',
        'feature_one' => 'required',
        'feature_two' => 'required',
        'feature_three' => 'required',
        'button_text' => 'required',
        'image' => 'required|image'
    ]);

    $image = $request->file('image')->store('promo-products', 'public');

    $promo = PromoProductSection::create([
        'badge' => $request->badge,
        'heading' => $request->heading,
        'paragraph' => $request->paragraph,
        'price' => $request->price,
        'feature_one' => $request->feature_one,
        'feature_two' => $request->feature_two,
        'feature_three' => $request->feature_three,
        'button_text' => $request->button_text,
        'image' => $image
    ]);

    return response()->json([
        'success' => true,
        'promo_product' => $promo
    ]);
}




public function update(Request $request, $id)
{
    $promo = PromoProductSection::findOrFail($id);

    if ($request->hasFile('image')) {

        if ($promo->image && Storage::exists('public/'.$promo->image)) {
            Storage::delete('public/'.$promo->image);
        }

        $promo->image = $request->file('image')->store('promo-products', 'public');
    }

    $promo->badge = $request->badge;
    $promo->heading = $request->heading;
    $promo->paragraph = $request->paragraph;
    $promo->price = $request->price;
    $promo->feature_one = $request->feature_one;
    $promo->feature_two = $request->feature_two;
    $promo->feature_three = $request->feature_three;
    $promo->button_text = $request->button_text;

    $promo->save();

    return response()->json([
        'success' => true,
        'promo_product' => $promo
    ]);
}








}
