<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('products', function () {
    return response(\App\Product::all(), 200);
});

Route::get('products/{product}', function ($productId) {
    $response = response(\App\Product::findOrFail($productId), 200);
    return $response;
});

Route::post('products', function (Request $request) {
    return \App\Product::create($request->all);
});

Route::put('products/{product}', function (Request $request, $productId) {
    $product = \App\Product::findOrFail($productId);
    $product->update($request->all());
    return $product;
});

Route::delete('products/{product}', function ($productId) {

    \App\Product::find($productId)->delete();

    return 204;
});