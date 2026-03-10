<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flavour extends Model
{
    protected $fillable = [
        'category_id',
        'subcategory_id',
        'product_id',
        'name',
        'slug',
        'desc',
        'price',
        'stock',
        'image'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
