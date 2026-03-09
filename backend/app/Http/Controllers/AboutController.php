<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\AboutSection;

class AboutController extends Controller
{
    

public function index()
{
    return response()->json([
        'success' => true,
        'about' => AboutSection::first()
    ]);
}


public function store(Request $request)
{
    $request->validate([
        'badge' => 'nullable',
        'heading' => 'required',
        'paragraph' => 'required',
        'years' => 'required',
        'customers' => 'required',
        'products' => 'required',
        'support' => 'required',
        'image' => 'required|image'
    ]);

    $image = $request->file('image')->store('about', 'public');

    $about = AboutSection::create([
        'badge' => $request->badge,
        'heading' => $request->heading,
        'paragraph' => $request->paragraph,
        'years' => $request->years,
        'customers' => $request->customers,
        'products' => $request->products,
        'support' => $request->support,
        'image' => $image
    ]);

    return response()->json([
        'success' => true,
        'about' => $about
    ]);
}



public function update(Request $request, $id)
{
    $about = AboutSection::findOrFail($id);

    if ($request->hasFile('image')) {

        if ($about->image && Storage::exists('public/'.$about->image)) {
            Storage::delete('public/'.$about->image);
        }

        $about->image = $request->file('image')->store('about', 'public');
    }

    $about->badge = $request->badge;
    $about->heading = $request->heading;
    $about->paragraph = $request->paragraph;
    $about->years = $request->years;
    $about->customers = $request->customers;
    $about->products = $request->products;
    $about->support = $request->support;

    $about->save();

    return response()->json([
        'success' => true,
        'about' => $about
    ]);
}
}
