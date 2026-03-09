<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\PromoSection;

class PromoController extends Controller
{




public function index()
{
    return response()->json([
        'success' => true,
        'promo' => PromoSection::first()
    ]);
}




public function store(Request $request)
{
    $request->validate([
        'badge' => 'nullable',
        'heading' => 'required',
        'paragraph' => 'required',
        'feature_one' => 'required',
        'feature_two' => 'required',
        'customers' => 'required',
        'image' => 'required|image'
    ]);

    $image = $request->file('image')->store('promo', 'public');

    $promo = PromoSection::create([
        'badge' => $request->badge,
        'heading' => $request->heading,
        'paragraph' => $request->paragraph,
        'feature_one' => $request->feature_one,
        'feature_two' => $request->feature_two,
        'customers' => $request->customers,
        'image' => $image
    ]);

    return response()->json([
        'success' => true,
        'promo' => $promo
    ]);
}






public function update(Request $request, $id)
{
    $promo = PromoSection::findOrFail($id);

    if ($request->hasFile('image')) {

        if ($promo->image && Storage::exists('public/'.$promo->image)) {
            Storage::delete('public/'.$promo->image);
        }

        $promo->image = $request->file('image')->store('promo', 'public');
    }

    $promo->badge = $request->badge;
    $promo->heading = $request->heading;
    $promo->paragraph = $request->paragraph;
    $promo->feature_one = $request->feature_one;
    $promo->feature_two = $request->feature_two;
    $promo->customers = $request->customers;

    $promo->save();

    return response()->json([
        'success' => true,
        'promo' => $promo
    ]);
}



}
