<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductComment;

class ProductCommentController extends Controller
{


    public function addComment(Request $request)
{
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'comment' => 'required',
        'rating' => 'required|integer|min:1|max:5'
    ]);

    $comment = ProductComment::create([
        'user_id' => auth()->id(),
        'product_id' => $request->product_id,
        'comment' => $request->comment,
        'rating' => $request->rating
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Comment added successfully',
        'data' => $comment
    ]);
}



public function productComments($product_id)
{
    $comments = ProductComment::with('user')
        ->where('product_id', $product_id)
        ->latest()
        ->get();

    return response()->json([
        'success' => true,
        'comments' => $comments
    ]);
}


public function allComments()
{
    $comments = ProductComment::with(['user','product'])
        ->latest()
        ->get();

    return response()->json([
        'success' => true,
        'comments' => $comments
    ]);
}
}
