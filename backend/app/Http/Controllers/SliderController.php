<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; 
use App\Models\Slider;

class SliderController extends Controller
{


public function index()
{
    return response()->json([
        'success' => true,
        'sliders' => Slider::all()
    ]);
}


    

public function store(Request $request)
{
    $request->validate([
        'btn_text' => 'required',
        'link' => 'required',
        'image' => 'required|image',
    ]);

    $path = $request->file('image')->store('sliders', 'public');

    $slider = Slider::create([
        'btn_text' => $request->btn_text,
        'link' => $request->link,
        'image' => $path,
    ]);

    return response()->json([
        'success' => true,
        'slider' => $slider
    ]);
}



public function update(Request $request, $id)
{
    $slider = Slider::findOrFail($id);

    if ($request->hasFile('image')) {

        // old image delete
        if ($slider->image && Storage::exists('public/'.$slider->image)) {
            Storage::delete('public/'.$slider->image);
        }

        $slider->image = $request->file('image')->store('sliders', 'public');
    }

    $slider->btn_text = $request->btn_text;
    $slider->link = $request->link;

    $slider->save();

    return response()->json([
        'success' => true,
        'slider' => $slider
    ]);
}


public function destroy($id)
{
    $slider = Slider::findOrFail($id);

    if ($slider->image && Storage::exists('public/'.$slider->image)) {
        Storage::delete('public/'.$slider->image);
    }

    $slider->delete();

    return response()->json([
        'success' => true
    ]);
}






// public function store(Request $request)
// {
//     $request->validate([
//         'heading' => 'required',
//         'paragraph' => 'required',
//         'image' => 'required|image',
//         'offer_tag' => 'nullable',
//         'badge_product_name' => 'nullable',
//         'badge_trusted_text' => 'nullable',
//     ]);

//     $path = $request->file('image')->store('sliders', 'public');

//     $slider = Slider::create([
//         'heading' => $request->heading,
//         'paragraph' => $request->paragraph,
//         'image' => $path,
//         'offer_tag' => $request->offer_tag,
//         'badge_product_name' => $request->badge_product_name,
//         'badge_trusted_text' => $request->badge_trusted_text,
//     ]);

//     return response()->json([
//         'success' => true,
//         'slider' => $slider
//     ]);
// }


// public function update(Request $request, $id)
// {
//     $slider = Slider::findOrFail($id);

//     if ($request->hasFile('image')) {

//         // old image delete
//         if ($slider->image && Storage::exists('public/'.$slider->image)) {
//             Storage::delete('public/'.$slider->image);
//         }

//         $slider->image = $request->file('image')->store('sliders', 'public');
//     }

//     $slider->heading = $request->heading;
//     $slider->paragraph = $request->paragraph;
//     $slider->offer_tag = $request->offer_tag;
//     $slider->badge_product_name = $request->badge_product_name;
//     $slider->badge_trusted_text = $request->badge_trusted_text;

//     $slider->save();

//     return response()->json([
//         'success' => true,
//         'slider' => $slider
//     ]);
// }


// public function destroy($id)
// {
//     $slider = Slider::findOrFail($id);

//     if ($slider->image && Storage::exists('public/'.$slider->image)) {
//         Storage::delete('public/'.$slider->image);
//     }

//     $slider->delete();

//     return response()->json([
//         'success' => true
//     ]);
// }



}
