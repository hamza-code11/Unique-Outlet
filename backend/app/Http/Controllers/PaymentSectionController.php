<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\PaymentSection;


class PaymentSectionController extends Controller
{
    

public function index()
{
    return response()->json([
        'success' => true,
        'payment' => PaymentSection::first()
    ]);
}




public function store(Request $request)
{

$request->validate([
'shipping_charges' => 'required',
'bank_name' => 'required',
'account_title' => 'required',
'account_number' => 'required',
'iban' => 'required',
'qrcode_image' => 'required|image'
]);

$image = $request->file('qrcode_image')->store('payments','public');

$payment = PaymentSection::create([
'shipping_charges' => $request->shipping_charges,
'bank_name' => $request->bank_name,
'account_title' => $request->account_title,
'account_number' => $request->account_number,
'iban' => $request->iban,
'qrcode_image' => $image,
'other' => $request->other
]);

return response()->json([
'success' => true,
'payment' => $payment
]);

}





public function update(Request $request, $id)
{

$payment = PaymentSection::findOrFail($id);

if ($request->hasFile('qrcode_image')) {

if ($payment->qrcode_image && Storage::exists('public/'.$payment->qrcode_image)) {
Storage::delete('public/'.$payment->qrcode_image);
}

$payment->qrcode_image = $request->file('qrcode_image')->store('payments','public');
}

$payment->shipping_charges = $request->shipping_charges;
$payment->bank_name = $request->bank_name;
$payment->account_title = $request->account_title;
$payment->account_number = $request->account_number;
$payment->iban = $request->iban;
$payment->other = $request->other;

$payment->save();

return response()->json([
'success' => true,
'payment' => $payment
]);

}




}
