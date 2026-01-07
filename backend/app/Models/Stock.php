<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        'symbol', 'name', 'value', 'change', 'chgPct', 'open', 'high', 'low', 'prev', 'color'
    ];
}
