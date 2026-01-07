<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use App\Models\TicketMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SupportController extends Controller
{
    public function index(Request $request)
    {
        $tickets = SupportTicket::where('user_id', $request->user()->id)
            ->with(['messages'])
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json($tickets);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'priority' => 'required|in:Low,Medium,High',
            'message' => 'required|string',
        ]);

        $ticket = SupportTicket::create([
            'user_id' => $request->user()->id,
            'ticket_number' => 'TK-' . strtoupper(Str::random(8)),
            'subject' => $request->subject,
            'priority' => $request->priority,
            'status' => 'Open',
        ]);

        TicketMessage::create([
            'support_ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'message' => $request->message,
        ]);

        return response()->json([
            'message' => 'Support ticket created successfully.',
            'ticket' => $ticket->load('messages'),
        ]);
    }

    public function show($id, Request $request)
    {
        $ticket = SupportTicket::where('user_id', $request->user()->id)
            ->with(['messages.user'])
            ->findOrFail($id);

        return response()->json($ticket);
    }

    public function reply(Request $request, $id)
    {
        $ticket = SupportTicket::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $request->validate([
            'message' => 'required|string',
        ]);

        $message = TicketMessage::create([
            'support_ticket_id' => $ticket->id,
            'user_id' => $request->user()->id,
            'message' => $request->message,
        ]);

        $ticket->status = 'Replied';
        $ticket->last_reply = now();
        $ticket->save();

        return response()->json([
            'message' => 'Reply sent successfully.',
            'ticket_message' => $message,
        ]);
    }

    public function close($id, Request $request)
    {
        $ticket = SupportTicket::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $ticket->status = 'Closed';
        $ticket->save();

        return response()->json(['message' => 'Ticket closed successfully.']);
    }
}
