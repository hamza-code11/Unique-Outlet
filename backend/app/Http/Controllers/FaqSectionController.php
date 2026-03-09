<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Storage;
use App\Models\FaqSection;

class FaqSectionController extends Controller
{


public function index()
{
    return response()->json([
        'success' => true,
        'faq' => FaqSection::first()
    ]);
}




public function store(Request $request)
{
    $request->validate([
        'image' => 'required|image',
        'heading' => 'required'
    ]);

    $image = $request->file('image')->store('faq', 'public');

    $faq = FaqSection::create([
        'image' => $image,
        'badge' => $request->badge,
        'heading' => $request->heading,

        'question1' => $request->question1,
        'answer1' => $request->answer1,

        'question2' => $request->question2,
        'answer2' => $request->answer2,

        'question3' => $request->question3,
        'answer3' => $request->answer3
    ]);

    return response()->json([
        'success' => true,
        'faq' => $faq
    ]);
}





public function update(Request $request, $id)
{
    $faq = FaqSection::findOrFail($id);

    if ($request->hasFile('image')) {

        if ($faq->image && Storage::exists('public/'.$faq->image)) {
            Storage::delete('public/'.$faq->image);
        }

        $faq->image = $request->file('image')->store('faq', 'public');
    }

    $faq->update($request->except('image'));

    return response()->json([
        'success' => true,
        'faq' => $faq
    ]);
}





}
