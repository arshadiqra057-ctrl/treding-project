<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // For now, return all stocks. Pagination can be added later if needed.
        $stocks = Stock::all();
        return response()->json($stocks);
    }
}
