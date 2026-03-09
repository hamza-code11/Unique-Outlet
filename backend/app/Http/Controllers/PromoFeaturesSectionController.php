<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\PromoFeaturesSection;

class PromoFeaturesSectionController extends Controller
{


    public function index()
{
    return response()->json([
        'success' => true,
        'data' => PromoFeaturesSection::first()
    ]);
}




public function store(Request $request)
{
    $request->validate([
        'image' => 'required|image',
        'heading' => 'required',
        'paragraph' => 'required',
        'button_text' => 'required'
    ]);

    $image = $request->file('image')->store('promo-features', 'public');

    $promo = PromoFeaturesSection::create([
        'image' => $image,
        'badge' => $request->badge,
        'heading' => $request->heading,
        'paragraph' => $request->paragraph,
        'button_text' => $request->button_text,

        'feature_one_heading' => $request->feature_one_heading,
        'feature_one_paragraph' => $request->feature_one_paragraph,

        'feature_two_heading' => $request->feature_two_heading,
        'feature_two_paragraph' => $request->feature_two_paragraph,

        'feature_three_heading' => $request->feature_three_heading,
        'feature_three_paragraph' => $request->feature_three_paragraph,
    ]);

    return response()->json([
        'success' => true,
        'data' => $promo
    ]);
}




public function update(Request $request, $id)
{
    $promo = PromoFeaturesSection::findOrFail($id);

    if ($request->hasFile('image')) {

        if ($promo->image && Storage::exists('public/'.$promo->image)) {
            Storage::delete('public/'.$promo->image);
        }

        $promo->image = $request->file('image')->store('promo-features', 'public');
    }

    $promo->update($request->except('image'));

    return response()->json([
        'success' => true,
        'data' => $promo
    ]);
}





}
