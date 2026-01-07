<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\KycRecord;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * List all registered users.
     */
    public function indexUsers()
    {
        $users = User::with('kycRecord')->orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    /**
     * List all pending KYC submissions.
     */
    public function pendingKyc()
    {
        $pending = KycRecord::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc')
            ->get();
        return response()->json($pending);
    }

    /**
     * Update KYC status (Approve or Reject).
     */
    public function updateKycStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'rejection_reason' => 'required_if:status,rejected|string|nullable',
        ]);

        $kyc = KycRecord::findOrFail($id);
        $kyc->update([
            'status' => $request->status,
            'rejection_reason' => $request->rejection_reason,
        ]);

        return response()->json([
            'message' => "KYC status updated to {$request->status} successfully.",
            'data' => $kyc
        ]);
    }

    /**
     * Delete a user (optional but useful for admins).
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function transferBalance(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'from' => 'required|in:funding,holding',
            'to' => 'required|in:funding,holding|different:from',
        ]);

        $user = $request->user();
        $amount = (float)$request->amount;
        $fromField = (string)$request->from . '_balance';
        $toField = (string)$request->to . '_balance';

        if ($user->$fromField < $amount) {
            return response()->json(['message' => 'Insufficient balance in ' . $request->from . ' account.'], 422);
        }

        $user->$fromField -= $amount;
        $user->$toField += $amount;
        $user->save();

        // Log the transaction
        Transaction::create([
            'user_id' => $user->id,
            'type' => 'transfer',
            'amount' => $amount,
            'from_account' => $request->from,
            'to_account' => $request->to,
            'status' => 'completed',
        ]);

        return response()->json([
            'message' => 'Transfer successful',
            'user' => $user
        ]);
    }

    public function indexTransactions()
    {
        $transactions = Transaction::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($transactions);
    }

    /**
     * List transactions for the currently authenticated user (for client deposit history).
     */
    public function userTransactions(Request $request)
    {
        $user = $request->user();

        $transactions = Transaction::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($transactions);
    }

    /**
     * Get payment settings for bank and crypto.
     */
    public function getPaymentSettings()
    {
        $settings = \App\Models\PaymentSetting::all()->groupBy('method');
        return response()->json($settings);
    }

    /**
     * Store a pending deposit request.
     */
    public function storeDepositRequest(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'method' => 'required|in:bank,crypto',
        ]);

        $user = $request->user();

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'type' => 'deposit',
            'amount' => $request->amount,
            'from_account' => $request->method, // Identifying the source
            'to_account' => 'funding',
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Deposit request submitted successfully.',
            'transaction' => $transaction
        ]);
    }

    /**
     * Update transaction status (Approve/Reject).
     */
    public function updateTransactionStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:completed,rejected',
        ]);

        $transaction = Transaction::findOrFail($id);
        
        if ($transaction->status !== 'pending') {
            return response()->json(['message' => 'Transaction is already processed.'], 422);
        }

        $transaction->status = $request->status;
        $transaction->save();

        if ($request->status === 'completed') {
            $user = $transaction->user;
            $user->funding_balance += $transaction->amount;
            $user->save();
        }

        return response()->json([
            'message' => "Transaction {$request->status} successfully.",
            'transaction' => $transaction
        ]);
    }
    public function indexStocks()
    {
        $stocks = \App\Models\Stock::all();
        return response()->json($stocks);
    }
}
