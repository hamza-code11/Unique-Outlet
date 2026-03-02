<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NavbarSetting;
use Illuminate\Http\Request;

class NavbarSettingController extends Controller
{
    // Get Navbar Setting
    public function index()
    {
        $setting = NavbarSetting::first();
        return response()->json($setting);
    }

    // Update Logo
    public function update(Request $request)
    {
        $request->validate([
            'logo_image' => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048'
        ]);

        $setting = NavbarSetting::first();

        if ($request->hasFile('logo_image')) {

            // delete old logo
            if ($setting->logo_image && file_exists(public_path($setting->logo_image))) {
                unlink(public_path($setting->logo_image));
            }

            $file = $request->file('logo_image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads'), $filename);

            $setting->logo_image = 'uploads/' . $filename;
        }

        $setting->save();

        return response()->json([
            'message' => 'Navbar updated successfully',
            'data' => $setting
        ]);
    }
}