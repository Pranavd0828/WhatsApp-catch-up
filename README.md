# WhatsApp Catch-Up Prototype

A high-fidelity WhatsApp Web prototype featuring the new "Catch-Up" experience for long series of voice notes.

## Features Built
- **React + Vite** setup with **Tailwind CSS v4** styling.
- Complete mapping of **WhatsApp Design Tokens** (Colors, Radii, Shadows, Light/Dark Modes).
- **Responsive App Shell** (`NavigationRail`, `ChatList`, `ConversationView`).
- **Global Catch Up View**: A special filter in the Chat List that aggregates all chats with pending voice notes, showing topic summaries and total durations.
- **Dynamic Chat Previews**: `ChatRow` correctly infers text/voice-note previews from global mock data state.
- **Detailed Catch-Up Panel**:
  - Highlights extracted topics and decisions.
  - Lists questions that "Need your input".
  - **Simulated Playback**: A Play/Pause toggle with real mock-timer progression. The interactive waveform visualizes the play state. Clicking the waveform seeks audio playback.
  - **Transcript Search**: Collapsible transcript panel highlighting the currently playing segment.
  - **Skip Greetings toggle**.
- **Smart Reply Helper**: Selecting questions from the panel opens a context-aware composer that simulates a Gen-AI response (with modes like "detailed", "short", "warm").
- **Send Message Flow**: Hitting "Send" appends the message to state, updates the chat preview, and marks the selected questions as "Answered".

## Getting Started

1. Install dependencies (if you haven't already):
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open `http://localhost:5173` in your browser.
