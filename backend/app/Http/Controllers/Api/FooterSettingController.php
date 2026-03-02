<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use Illuminate\Http\Request;

class FooterSettingController extends Controller
{
    public function index()
    {
        $footer = FooterSetting::first();
        return response()->json($footer);
    }

    public function update(Request $request)
    {
        $footer = FooterSetting::first();

        $footer->data = $request->data;
        $footer->save();

        return response()->json([
            'message' => 'Footer updated successfully',
            'data' => $footer
        ]);
    }
}