<?php

namespace App\Http\Controllers;

use App\Models\KycRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KycController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'document_type' => 'required|string|in:passport,id_card,driving_license',
            'document_number' => 'required|string',
            'document_front' => 'required|image|max:2048', // Max 2MB
            'document_back' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();

        // Check if user already has a pending or approved KYC
        if ($user->kycRecord && in_array($user->kycRecord->status, ['pending', 'approved'])) {
            return response()->json(['message' => 'You already have a KYC record in process or approved.'], 400);
        }

        // Handle File Uploads
        $frontPath = $request->file('document_front')->store('kyc-documents', 'public');
        $backPath = $request->hasFile('document_back') 
            ? $request->file('document_back')->store('kyc-documents', 'public') 
            : null;

        $kyc = KycRecord::updateOrCreate(
            ['user_id' => $user->id],
            [
                'document_type' => $request->document_type,
                'document_number' => $request->document_number,
                'document_front_image_path' => $frontPath,
                'document_back_image_path' => $backPath,
                'status' => 'pending',
                'rejection_reason' => null,
            ]
        );

        return response()->json([
            'message' => 'KYC submitted successfully.',
            'data' => $kyc
        ], 201);
    }

    public function status(Request $request)
    {
        $user = $request->user();
        
        if (!$user->kycRecord) {
            return response()->json(['status' => 'not_submitted'], 200);
        }

        return response()->json(['data' => $user->kycRecord], 200);
    }
}
