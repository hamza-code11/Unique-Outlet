<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $casts = [
    'specifications' => 'array',
    'vendor_info' => 'array',
];

protected $fillable = [
    'category_id',
    'sub_category_id',
    'name',
    'slug',
    'price',
    'brand_name',
    'stock',
    'description',
    'bottle_size',
    'specifications',
    'vendor_info',
    'status',
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
];

public function category()
{
    return $this->belongsTo(Category::class);
}

public function subCategory()
{
    return $this->belongsTo(SubCategory::class);
}

}
