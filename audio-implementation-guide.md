# Real Voice Note Audio Implementation Guide

This prototype originally used a timer-only playback simulation. To make voice notes audibly play while preserving the WhatsApp-style UI, use local audio files in `public/audio/` and reference them from each `VoiceNote`.

## Current Implementation

The Ellie chat now has local generated voice clips:

- `public/audio/ellie-vn-1.wav`
- `public/audio/ellie-vn-2.wav`
- `public/audio/ellie-vn-3.wav`
- `public/audio/ellie-vn-4.wav`
- `public/audio/ellie-vn-5.wav`
- `public/audio/ellie-vn-6.wav`
- `public/audio/ellie-vn-7.wav`

Each `VoiceNote` supports an optional `audioUrl`:

```ts
export type VoiceNote = {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  direction: 'incoming' | 'outgoing';
  durationSeconds: number;
  audioUrl?: string;
  sentAt: string;
  waveform: number[];
  isPlayed: boolean;
  playbackProgressSeconds: number;
  clusterId?: string;
};
```

Ellie's voice notes reference those files with public URLs:

```ts
{
  id: 'vn-1',
  chatId: 'chat-1',
  senderId: 'ellie',
  senderName: 'Ellie',
  audioUrl: '/audio/ellie-vn-1.wav',
  durationSeconds: 150,
  ...
}
```

Vite serves anything inside `public/` from the site root, so `public/audio/ellie-vn-1.wav` is available at `/audio/ellie-vn-1.wav`.

## How Playback Works

`VoiceNoteBubble.tsx` keeps the existing visual playback state and adds real audio when `voiceNote.audioUrl` exists.

The play button now does three things:

1. Stops any previously active voice-note audio.
2. Creates an `HTMLAudioElement` from `voiceNote.audioUrl`.
3. Starts the existing `playbackState` and `playbackProgressSeconds` flow so the waveform still animates.

If a voice note has no `audioUrl`, it falls back to the existing silent timer simulation.

## Generating More Demo Audio

On macOS, local generated voice clips can be created with `say`:

```bash
mkdir -p public/audio
say -v Samantha -o public/audio/ellie-vn-1.aiff "Your voice note script goes here."
afconvert -f WAVE -d LEI16 public/audio/ellie-vn-1.aiff public/audio/ellie-vn-1.wav
```

Use a female system voice such as `Samantha` for Ellie. To list installed voices:

```bash
say -v '?'
```

Recommended naming pattern:

```text
public/audio/{sender-name}-vn-{number}.wav
```

Examples:

```text
public/audio/ellie-vn-1.wav
public/audio/ellie-vn-2.wav
public/audio/mom-vn-1.wav
```

## Best Practices

- Keep generated demo clips short, even if the UI displays longer mock durations.
- Match the spoken content to the transcript and Catch Up summary.
- Avoid using real personal WhatsApp audio in a portfolio project unless you have clear permission.
- Prefer local files over remote URLs so the demo works offline and does not depend on external hosting.
- Use `.wav`, `.m4a`, or `.mp3` for browser compatibility. This repo uses `.wav` because it can be generated locally and verified consistently on macOS.

## Full Production Upgrade Path

For a production-quality playback engine, the next step is to move audio ownership out of individual bubbles and into a central playback controller.

Recommended state additions:

```ts
activeVoiceNoteId: string | null;
activeAudioUrl: string | null;
playbackDurationSeconds: number;
```

Recommended behavior:

1. Store one shared `HTMLAudioElement` in a React ref at the app or conversation level.
2. On play, set the audio source to the selected voice note.
3. Use the audio element's `timeupdate` event to set `playbackProgressSeconds`.
4. Use `ended` to advance to the next voice note in the cluster or stop playback.
5. Use waveform clicks to update both `audio.currentTime` and `playbackProgressSeconds`.
6. Pause audio when switching chats or closing the panel.

That architecture keeps real audio, waveform progress, transcript highlighting, and Catch Up panel playback perfectly synchronized.

## Verification Checklist

Run:

```bash
npm run build
npm run lint
npm run dev
```

Then verify:

1. Open Ellie.
2. Click the first voice note Play button.
3. Confirm a female voice clip is audible.
4. Confirm the waveform still animates.
5. Click another Ellie voice note and confirm the previous audio stops.
6. Open another voice-note chat and confirm silent simulated playback still works when no `audioUrl` exists.
