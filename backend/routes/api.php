<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\NavbarSettingController;
use App\Http\Controllers\Api\FooterSettingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Google Socialite Authentication Routes
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin-dashboard', function () {
        return response()->json(['message' => 'Welcome Admin']);
    });
        Route::post('/navbar-setting', [NavbarSettingController::class, 'update']);
Route::post('/footer-setting', [FooterSettingController::class, 'update']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});




Route::get('/navbar-setting', [NavbarSettingController::class, 'index']);
Route::post('/navbar-setting', [NavbarSettingController::class, 'update']); 

Route::get('/footer-setting', [FooterSettingController::class, 'index']);
Route::post('/footer-setting', [FooterSettingController::class, 'update']);




Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);


Route::get('/subcategories', [SubCategoryController::class, 'index']);
Route::post('/subcategories', [SubCategoryController::class, 'store']);
Route::get('/subcategories/{id}', [SubCategoryController::class, 'show']);
Route::put('/subcategories/{id}', [SubCategoryController::class, 'update']);
Route::delete('/subcategories/{id}', [SubCategoryController::class, 'destroy']);


Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contacts', [ContactController::class, 'index']);

Route::get('/footer-setting', [FooterSettingController::class, 'index']);
Route::post('/footer-setting', [FooterSettingController::class, 'update']);


Route::get('/products/subcategory/{id}', [ProductController::class, 'bySubCategory']);
Route::get('/products/subcategory/slug/{slug}', [ProductController::class, 'productsBySubCategorySlug']);   

// http://127.0.0.1:8000/api/categories
// http://127.0.0.1:8000/api/subcategories
// http://127.0.0.1:8000/api/products

