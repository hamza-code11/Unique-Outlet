<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubCategory;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    public function index()
{
    return response()->json(
        SubCategory::with('category')->get()
    );
}




    // STORE
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255'
        ]);

        $sub = SubCategory::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json([
            'message' => 'SubCategory created',
            'subcategory' => $sub
        ]);
    }



        public function show($id)
    {
        $sub = SubCategory::with('category')->find($id);

        if (!$sub) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($sub);
    }




        // UPDATE
    public function update(Request $request, $id)
    {
        $sub = SubCategory::find($id);

        if (!$sub) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255'
        ]);

        $sub->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json([
            'message' => 'Updated successfully',
            'subcategory' => $sub
        ]);
    }


        // DELETE
    public function destroy($id)
    {
        $sub = SubCategory::find($id);

        if (!$sub) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $sub->delete();

        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }


}
