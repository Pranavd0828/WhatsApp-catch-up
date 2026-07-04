import { CatchUpResult } from '../types';

export const mockCatchUps: CatchUpResult[] = [
  {
    id: 'catchup-1',
    chatId: 'chat-1',
    senderName: 'Ellie',
    voiceNoteIds: ['vn-1', 'vn-2', 'vn-3', 'vn-4', 'vn-5', 'vn-6', 'vn-7'], 
    totalDurationSeconds: 1080, // 18 mins (as per PRD)
    generatedAt: new Date().toISOString(),
    status: 'ready',
    headline: "Wedding planning update",
    topics: [
      { id: 't1', label: "Wedding venue", importance: "high", summary: "Venue is confirmed for Dec 14.", startTimeSeconds: 0, endTimeSeconds: 85 },
      { id: 't2', label: "Florist quote", importance: "high", summary: "Quote changed to $1200.", startTimeSeconds: 85, endTimeSeconds: 150 },
      { id: 't3', label: "Guest count", importance: "medium", summary: "Count increased to 180.", startTimeSeconds: 150, endTimeSeconds: 200 },
      { id: 't4', label: "Makeup artist timing", importance: "low", summary: "Available early morning.", startTimeSeconds: 200, endTimeSeconds: 230 },
      { id: 't5', label: "Payment schedule", importance: "high", summary: "Need to pay deposit by tomorrow.", startTimeSeconds: 230, endTimeSeconds: 254 }
    ],
    questions: [
      { id: 'q-1', questionText: "Can you approve the florist quote tonight?", status: "open", normalizedAsk: "Approve florist quote", suggestedAnswer: "Yes, this works for me. Please go ahead with the florist.", directedAtUser: true, startTimeSeconds: 85, endTimeSeconds: 100, confidence: 0.95 },
      { id: 'q-2', questionText: "What is the final RSVP estimate?", status: "open", normalizedAsk: "Confirm RSVP estimate", suggestedAnswer: "The final RSVP count is 180.", directedAtUser: true, startTimeSeconds: 150, endTimeSeconds: 180, confidence: 0.90 },
      { id: 'q-3', questionText: "Could you review the payment amount before I send it?", status: "open", normalizedAsk: "Review payment amount", suggestedAnswer: "Yes, send me the invoice to review.", directedAtUser: true, startTimeSeconds: 230, endTimeSeconds: 250, confidence: 0.85 }
    ],
    decisions: [
      { id: 'd1', decisionText: 'Venue date is finalized for Dec 14.', startTimeSeconds: 45, endTimeSeconds: 55, confidence: 0.99 }
    ],
    updates: [
      { id: 'u1', updateText: 'Quote increased by $400.' }
    ],
    tone: [
      { label: "excited", evidence: "High pitch when discussing venue", confidence: 0.85 },
      { label: "stressed", evidence: "Speaking faster when discussing payment", confidence: 0.70 }
    ],
    importantSegments: [
      { id: 'seg-1', startTimeSeconds: 85, endTimeSeconds: 100 },
      { id: 'seg-2', startTimeSeconds: 150, endTimeSeconds: 180 }
    ],
    suggestedReplies: [
      { id: 'sr-1', mode: 'detailed', text: 'Drafting full reply...', coversQuestionIds: ['q-1', 'q-2', 'q-3'] }
    ],
    transcript: [
      { id: 't-1', startTimeSeconds: 0, endTimeSeconds: 85, text: "Hey! Just wanted to give you an update on the wedding planning.", isDecision: false },
      { id: 't-2', startTimeSeconds: 85, endTimeSeconds: 150, text: "The florist sent the updated quote. Can you approve the florist quote tonight?", isDecision: true },
      { id: 't-3', startTimeSeconds: 150, endTimeSeconds: 200, text: "Also, what is the final RSVP estimate? We need to give them a guest count.", isDecision: true },
      { id: 't-4', startTimeSeconds: 230, endTimeSeconds: 254, text: "Could you review the payment amount before I send it? We need to pay the deposit tomorrow.", isDecision: true }
    ],
    confidence: 0.92
  },
  {
    id: 'catchup-2',
    chatId: 'chat-2',
    senderName: 'Eddie',
    voiceNoteIds: ['vn-8', 'vn-9', 'vn-10'],
    totalDurationSeconds: 300, // 5 mins
    generatedAt: new Date().toISOString(),
    status: 'ready',
    headline: "Weekend plan coordination",
    topics: [
      { id: 't6', label: "Dinner location", importance: "high", summary: "Choosing between two restaurants.", startTimeSeconds: 0, endTimeSeconds: 120 },
      { id: 't7', label: "Arrival time", importance: "medium", summary: "Confirming when to arrive.", startTimeSeconds: 120, endTimeSeconds: 180 },
      { id: 't8', label: "Parking", importance: "low", summary: "Parking situation at the venue.", startTimeSeconds: 180, endTimeSeconds: 210 }
    ],
    questions: [
      { id: 'q-4', questionText: "Which of the two restaurants do you prefer?", status: "open", normalizedAsk: "Choose between two restaurants", suggestedAnswer: "I'd prefer the Italian place.", directedAtUser: true, startTimeSeconds: 0, endTimeSeconds: 60, confidence: 0.95 },
      { id: 'q-5', questionText: "Can you confirm your arrival time?", status: "open", normalizedAsk: "Confirm arrival time", suggestedAnswer: "I will be there by 7 PM.", directedAtUser: true, startTimeSeconds: 120, endTimeSeconds: 140, confidence: 0.98 }
    ],
    decisions: [],
    updates: [],
    tone: [
      { label: "casual", evidence: "Relaxed tone", confidence: 0.90 }
    ],
    importantSegments: [],
    suggestedReplies: [],
    transcript: [
      { id: 't-5', startTimeSeconds: 0, endTimeSeconds: 60, text: "Hey man, about this weekend, which of the two restaurants do you prefer?", isDecision: true },
      { id: 't-6', startTimeSeconds: 120, endTimeSeconds: 140, text: "Can you confirm your arrival time so I can book the table?", isDecision: true }
    ],
    confidence: 0.90
  },
  {
    id: 'catchup-3',
    chatId: 'chat-3',
    senderName: 'Family Group',
    voiceNoteIds: ['vn-11', 'vn-12', 'vn-13', 'vn-14', 'vn-15'],
    totalDurationSeconds: 720, // 12 mins
    generatedAt: new Date().toISOString(),
    status: 'ready',
    headline: "Family logistics",
    topics: [
      { id: 't9', label: "Travel plan", importance: "high", summary: "Discussing flights and dates.", startTimeSeconds: 0, endTimeSeconds: 200 },
      { id: 't10', label: "Hotel booking", importance: "medium", summary: "Rooms reserved for everyone.", startTimeSeconds: 200, endTimeSeconds: 400 },
      { id: 't11', label: "Airport pickup", importance: "high", summary: "Coordinating who will pick up whom.", startTimeSeconds: 400, endTimeSeconds: 600 }
    ],
    questions: [
      { id: 'q-6', questionText: "Can you share your flight number?", status: "open", normalizedAsk: "Share flight number", suggestedAnswer: "My flight number is UA123.", directedAtUser: true, startTimeSeconds: 100, endTimeSeconds: 120, confidence: 0.99 },
      { id: 'q-7', questionText: "What time do you need airport pickup?", status: "open", normalizedAsk: "Confirm pickup time", suggestedAnswer: "I need to be picked up at 3 PM.", directedAtUser: true, startTimeSeconds: 400, endTimeSeconds: 450, confidence: 0.95 }
    ],
    decisions: [],
    updates: [],
    tone: [
      { label: "urgent", evidence: "Needs to finalize bookings", confidence: 0.85 }
    ],
    importantSegments: [],
    suggestedReplies: [],
    transcript: [
      { id: 't-7', startTimeSeconds: 100, endTimeSeconds: 120, text: "Can you share your flight number so we can track it?", isDecision: true },
      { id: 't-8', startTimeSeconds: 400, endTimeSeconds: 450, text: "What time do you need airport pickup?", isDecision: true }
    ],
    confidence: 0.95
  },
  {
    id: 'catchup-4',
    chatId: 'chat-4',
    senderName: 'Work PM Group',
    voiceNoteIds: ['vn-16', 'vn-17', 'vn-18', 'vn-19'],
    totalDurationSeconds: 540, // 9 mins
    generatedAt: new Date().toISOString(),
    status: 'ready',
    headline: "Product launch update",
    topics: [
      { id: 't12', label: "Launch timeline", importance: "high", summary: "Targeting next Tuesday.", startTimeSeconds: 0, endTimeSeconds: 100 },
      { id: 't13', label: "Open bug", importance: "high", summary: "Critical bug in payment flow.", startTimeSeconds: 100, endTimeSeconds: 200 },
      { id: 't14', label: "Design review", importance: "medium", summary: "Need final sign-off.", startTimeSeconds: 200, endTimeSeconds: 300 },
      { id: 't15', label: "Metrics dashboard", importance: "low", summary: "Setting up analytics.", startTimeSeconds: 300, endTimeSeconds: 400 }
    ],
    questions: [
      { id: 'q-8', questionText: "Can you review the final PRD?", status: "open", normalizedAsk: "Review final PRD", suggestedAnswer: "I will review the PRD by end of day.", directedAtUser: true, startTimeSeconds: 200, endTimeSeconds: 250, confidence: 0.88 },
      { id: 'q-9', questionText: "Is the launch checklist confirmed?", status: "open", normalizedAsk: "Confirm launch checklist", suggestedAnswer: "Yes, the checklist is complete.", directedAtUser: false, startTimeSeconds: 50, endTimeSeconds: 80, confidence: 0.90 }
    ],
    decisions: [],
    updates: [],
    tone: [
      { label: "casual", evidence: "Focused business discussion", confidence: 0.90 }
    ],
    importantSegments: [],
    suggestedReplies: [],
    transcript: [
      { id: 't-9', startTimeSeconds: 50, endTimeSeconds: 80, text: "Is the launch checklist confirmed?", isDecision: true },
      { id: 't-10', startTimeSeconds: 200, endTimeSeconds: 250, text: "Can you review the final PRD before the design review?", isDecision: true }
    ],
    confidence: 0.91
  },
  {
    id: 'catchup-5',
    chatId: 'chat-5',
    senderName: 'Vendor',
    voiceNoteIds: ['vn-20', 'vn-21'],
    totalDurationSeconds: 240, // 4 mins
    generatedAt: new Date().toISOString(),
    status: 'ready',
    headline: "Wedding vendor quote",
    topics: [
      { id: 't16', label: "Price change", importance: "high", summary: "Prices increased by 10%.", startTimeSeconds: 0, endTimeSeconds: 100 },
      { id: 't17', label: "Availability", importance: "medium", summary: "Dates are limited.", startTimeSeconds: 100, endTimeSeconds: 150 },
      { id: 't18', label: "Payment deadline", importance: "high", summary: "Deposit due Friday.", startTimeSeconds: 150, endTimeSeconds: 200 }
    ],
    questions: [
      { id: 'q-10', questionText: "Can you confirm the package selection?", status: "open", normalizedAsk: "Confirm package", suggestedAnswer: "We will go with the Premium package.", directedAtUser: true, startTimeSeconds: 50, endTimeSeconds: 80, confidence: 0.94 },
      { id: 'q-11', questionText: "Will you be able to pay the deposit by Friday?", status: "open", normalizedAsk: "Pay deposit by Friday", suggestedAnswer: "Yes, I will send the payment tomorrow.", directedAtUser: true, startTimeSeconds: 150, endTimeSeconds: 180, confidence: 0.95 }
    ],
    decisions: [],
    updates: [],
    tone: [
      { label: "casual", evidence: "Formal tone", confidence: 0.80 }
    ],
    importantSegments: [],
    suggestedReplies: [],
    transcript: [
      { id: 't-11', startTimeSeconds: 50, endTimeSeconds: 80, text: "Can you confirm the package selection so we can lock it in?", isDecision: true },
      { id: 't-12', startTimeSeconds: 150, endTimeSeconds: 180, text: "Will you be able to pay the deposit by Friday?", isDecision: true }
    ],
    confidence: 0.89
  },
  {
    id: 'catchup-6',
    chatId: 'chat-6',
    senderName: 'Friend',
    voiceNoteIds: ['vn-22', 'vn-23', 'vn-24', 'vn-25', 'vn-26', 'vn-27'],
    totalDurationSeconds: 900, // 15 mins
    generatedAt: new Date().toISOString(),
    status: 'ready',
    headline: "Long emotional update",
    topics: [
      { id: 't19', label: "Work stress", importance: "high", summary: "Manager is being difficult.", startTimeSeconds: 0, endTimeSeconds: 300 },
      { id: 't20', label: "Weekend plan", importance: "medium", summary: "Needs to destress this weekend.", startTimeSeconds: 300, endTimeSeconds: 600 },
      { id: 't21', label: "Personal update", importance: "high", summary: "Talking about relationship stuff.", startTimeSeconds: 600, endTimeSeconds: 900 }
    ],
    questions: [], // No direct questions as per PRD
    decisions: [],
    updates: [
      { id: 'u2', updateText: 'No direct response needed, but tone sounds stressed.' }
    ],
    tone: [
      { label: "stressed", evidence: "Talking about work issues", confidence: 0.98 }
    ],
    importantSegments: [],
    suggestedReplies: [],
    transcript: [
      { id: 't-13', startTimeSeconds: 0, endTimeSeconds: 50, text: "Work has been really stressful lately, my manager is constantly on my back.", isDecision: false },
      { id: 't-14', startTimeSeconds: 600, endTimeSeconds: 650, text: "I just really need to destress this weekend.", isDecision: false }
    ],
    confidence: 0.97
  }
];
