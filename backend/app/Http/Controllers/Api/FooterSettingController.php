<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use Illuminate\Http\Request;

class FooterSettingController extends Controller
{
    public function index()
    {
        return response()->json(FooterSetting::first());
    }

    public function update(Request $request)
    {
        $request->validate([
            'brand_name' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'contact' => 'nullable|string',
            'gmail' => 'nullable|email',
            'newsletter_desc' => 'nullable|string'
        ]);

        $footer = FooterSetting::first();

        if (!$footer) {
            $footer = FooterSetting::create($request->all());
        } else {
            $footer->update($request->all());
        }

        return response()->json([
            'message' => 'Footer updated successfully',
            'footer' => $footer
        ]);
    }



    
}