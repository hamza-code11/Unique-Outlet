<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactSection;

class ContactSectionController extends Controller
{
    

public function index()
{
    return response()->json([
        'success' => true,
        'contact' => ContactSection::first()
    ]);
}



public function store(Request $request)
{

    $request->validate([
        'heading' => 'required',
        'paragraph' => 'required',
        'address' => 'required',
        'phone' => 'required',
        'email' => 'required',
        'customer_support' => 'required',
        'map_location' => 'required'
    ]);

    $contact = ContactSection::create([
        'badge' => $request->badge,
        'heading' => $request->heading,
        'paragraph' => $request->paragraph,
        'address' => $request->address,
        'phone' => $request->phone,
        'email' => $request->email,
        'customer_support' => $request->customer_support,
        'map_location' => $request->map_location
    ]);

    return response()->json([
        'success' => true,
        'contact' => $contact
    ]);
}


public function update(Request $request, $id)
{

    $contact = ContactSection::findOrFail($id);

    $contact->badge = $request->badge;
    $contact->heading = $request->heading;
    $contact->paragraph = $request->paragraph;
    $contact->address = $request->address;
    $contact->phone = $request->phone;
    $contact->email = $request->email;
    $contact->customer_support = $request->customer_support;
    $contact->map_location = $request->map_location;

    $contact->save();

    return response()->json([
        'success' => true,
        'contact' => $contact
    ]);
}



}
