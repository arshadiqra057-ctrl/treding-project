<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && (bool)$request->user()->is_admin === true) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized. Admin access only.'], 403);
    }
}
