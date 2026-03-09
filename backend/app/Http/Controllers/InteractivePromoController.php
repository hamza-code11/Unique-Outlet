<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\InteractivePromo;


class InteractivePromoController extends Controller
{


    public function index()
{
    return response()->json([
        'success' => true,
        'promo' => InteractivePromo::first()
    ]);
}
    

    public function store(Request $request)
{
    $data = $request->all();

    $data['left_image'] = $request->file('left_image')->store('interactive', 'public');
    $data['right_top_image'] = $request->file('right_top_image')->store('interactive', 'public');
    $data['right_bottom_image'] = $request->file('right_bottom_image')->store('interactive', 'public');

    $promo = InteractivePromo::create($data);

    return response()->json([
        'success' => true,
        'promo' => $promo
    ]);
}



public function update(Request $request, $id)
{
    $promo = InteractivePromo::findOrFail($id);

    if ($request->hasFile('left_image')) {

        Storage::delete('public/'.$promo->left_image);

        $promo->left_image = $request->file('left_image')
        ->store('interactive', 'public');
    }

    if ($request->hasFile('right_top_image')) {

        Storage::delete('public/'.$promo->right_top_image);

        $promo->right_top_image = $request->file('right_top_image')
        ->store('interactive', 'public');
    }

    if ($request->hasFile('right_bottom_image')) {

        Storage::delete('public/'.$promo->right_bottom_image);

        $promo->right_bottom_image = $request->file('right_bottom_image')
        ->store('interactive', 'public');
    }

    $promo->update($request->except(['left_image','right_top_image','right_bottom_image']));

    return response()->json([
        'success' => true,
        'promo' => $promo
    ]);
}



}
