<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubCategory;

class SubCategoryController extends Controller
{
    public function index()
{
    return response()->json(
        SubCategory::with('category')->get()
    );
}
}
