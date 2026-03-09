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
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\InteractivePromoController;
use App\Http\Controllers\FaqSectionController;
use App\Http\Controllers\PromoProductSectionController;
use App\Http\Controllers\PromoFeaturesSectionController;
use App\Http\Controllers\ContactSectionController;
use App\Http\Controllers\PaymentSectionController;
use App\Http\Controllers\ProductCommentController;
use App\Http\Controllers\FlavourController;


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



// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/checkout', [CheckoutController::class, 'store']);
// });
// Route::post('/checkout', [CheckoutController::class, 'store']);

// http://127.0.0.1:8000/api/categories
// http://127.0.0.1:8000/api/subcategories
// http://127.0.0.1:8000/api/products

    // Route::get('/order/{id}', [CheckoutController::class, 'show'])->name('api.order.show');

    // Order routes
Route::post('/checkout', [CheckoutController::class, 'store']);
Route::get('/checkout/{id}', [CheckoutController::class, 'show']);
Route::get('/user/{userId}/orders/latest', [CheckoutController::class, 'getLatestOrder']);

// In routes/api.php
Route::middleware('auth:sanctum')->get('/user/orders', [CheckoutController::class, 'userOrders']);
Route::middleware('auth:sanctum')->get('/order/{id}', [CheckoutController::class, 'orderById']);
Route::get('/orders', [CheckoutController::class, 'allOrders']);
Route::get('/order/{id}', [CheckoutController::class, 'getOrder']);
Route::post('/order/{id}/status', [CheckoutController::class, 'updateStatus']);


Route::get('/sliders', [SliderController::class, 'index']);
Route::post('/sliders', [SliderController::class, 'store']);
Route::post('/sliders/{id}', [SliderController::class, 'update']);
Route::delete('/sliders/{id}', [SliderController::class, 'destroy']);


Route::post('/about', [AboutController::class, 'store']);
Route::post('/about/{id}', [AboutController::class, 'update']);
Route::get('/about', [AboutController::class, 'index']);



Route::post('/promo', [PromoController::class, 'store']);
Route::post('/promo/{id}', [PromoController::class, 'update']);
Route::get('/promo', [PromoController::class, 'index']);



Route::get('/interactive-promo', [InteractivePromoController::class,'index']);
Route::post('/interactive-promo', [InteractivePromoController::class,'store']);
Route::post('/interactive-promo/{id}', [InteractivePromoController::class,'update']);


Route::get('/faq', [FaqSectionController::class,'index']);
Route::post('/faq', [FaqSectionController::class,'store']);
Route::post('/faq/{id}', [FaqSectionController::class,'update']);


Route::get('/promo-product', [PromoProductSectionController::class, 'index']);
Route::post('/promo-product', [PromoProductSectionController::class, 'store']);
Route::post('/promo-product/{id}', [PromoProductSectionController::class, 'update']);


Route::get('/promo-features', [PromoFeaturesSectionController::class,'index']);
Route::post('/promo-features', [PromoFeaturesSectionController::class,'store']);
Route::post('/promo-features/{id}', [PromoFeaturesSectionController::class,'update']);


Route::get('/contact-section', [ContactSectionController::class, 'index']);
Route::post('/contact-section', [ContactSectionController::class, 'store']);
Route::post('/contact-section/{id}', [ContactSectionController::class, 'update']);


Route::get('/payment-section', [PaymentSectionController::class,'index']);
Route::post('/payment-section', [PaymentSectionController::class,'store']);
Route::post('/payment-section/{id}', [PaymentSectionController::class,'update']);


Route::get('/users', [AuthController::class, 'users']);

Route::middleware('auth:sanctum')->post('/add-comment',[ProductCommentController::class,'addComment']);
Route::get('/product-comments/{product_id}',[ProductCommentController::class,'productComments']);
Route::get('/all-comments',[ProductCommentController::class,'allComments']);
// Route::middleware('auth:sanctum')->get('/all-comments',[ProductCommentController::class,'allComments']);



Route::post('/add-flavour',[FlavourController::class,'store']);
Route::get('/flavours',[FlavourController::class,'index']);
Route::get('/product-flavours/{id}',[FlavourController::class,'productFlavours']);
Route::post('/update-flavour/{id}', [FlavourController::class,'update']);

