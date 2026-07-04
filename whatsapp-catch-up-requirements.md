# WhatsApp Catch Up: Voice Note Catch-Up Requirements

## 1. Product Overview

### 1.1 Project Name

**WhatsApp Catch Up**

### 1.2 Feature Name

**Voice Note Catch-Up**

### 1.3 Repo Positioning

This project is a product intuition prototype for WhatsApp Web. The goal is to show how WhatsApp could help users quickly understand, navigate, and respond to long or multiple voice notes without forcing them to listen to every second manually.

This is not a generic transcription app. This is a WhatsApp-native communication feature that turns long-form audio into structured, actionable conversation context.

### 1.4 One-line Product Description

WhatsApp Catch Up helps users understand long or multiple voice notes by extracting topics, decisions, questions, emotional tone, and response-needed items before playback begins.

### 1.5 Core Product Insight

Voice notes are convenient for senders but expensive for recipients.

Text messages are skimmable. Voice notes are not. When someone sends several long voice notes, the recipient cannot quickly tell:

- What topics were discussed.
- Which parts matter.
- Whether a response is required.
- What questions were asked.
- Whether the sender sounded excited, upset, urgent, or casual.
- Which part of the audio to play first.

WhatsApp Catch Up solves this by making voice notes structured and navigable while keeping the experience native to WhatsApp.

---

## 2. Why This Product Should Exist

### 2.1 User Problem

Users receive long voice notes during busy moments: while working, commuting, cooking, walking, or handling multiple conversations. The sender may communicate 20 minutes of information, questions, decisions, and emotions in an audio format that cannot be scanned quickly.

The recipient then has three bad options:

1. Listen to the full audio immediately.
2. Ignore the audio and risk missing important context.
3. Reply vaguely without understanding the details.

This creates friction, anxiety, and delayed responses.

### 2.2 Current WhatsApp Experience

The current voice note experience is optimized for playback, not understanding.

Users can:

- Play a voice note.
- Pause it.
- Change playback speed.
- Scrub through the waveform.
- Reply to the message.
- Forward or react.

But users cannot easily:

- Preview what the voice note is about.
- See questions asked inside the audio.
- Jump to the most important section.
- Play only decision points.
- Play only questions.
- Understand emotional tone.
- Convert voice-note asks into a structured reply.
- Catch up on a sequence of many voice notes.

### 2.3 Product Opportunity

Voice notes should become skimmable without losing emotional nuance.

The opportunity is to add an intelligence layer that helps users decide:

- Do I need to listen now?
- What is this about?
- What does the sender need from me?
- Which parts should I play?
- How should I respond?

---

## 3. Product Goals

### 3.1 Primary Goal

Make long and multiple voice notes easy to understand, navigate, and respond to inside WhatsApp Web.

### 3.2 Secondary Goals

- Preserve WhatsApp's lightweight messaging feel.
- Avoid making the product feel like a separate AI app.
- Keep all AI output grounded in the actual voice notes.
- Provide useful summaries without removing emotional context.
- Support fast reply workflows.
- Make the prototype visually indistinguishable from WhatsApp Web except for the new feature layer.

### 3.3 Non-Goals

This MVP will not:

- Connect to real WhatsApp messages.
- Transcribe real audio from user uploads.
- Send real messages.
- Use real WhatsApp APIs.
- Store real user data.
- Support phone-number authentication.
- Implement end-to-end encryption.
- Build a full mobile app.
- Build a general audio transcription platform.
- Replace listening entirely.

---

## 4. Target Users

### 4.1 Primary User: Busy Voice Note Recipient

A user who receives long voice notes from friends, family, partners, coworkers, vendors, or planning groups and wants to understand them quickly.

#### Pain Points

- Receives multiple voice notes in a row.
- Cannot listen immediately.
- Misses questions hidden inside the audio.
- Forgets what was said.
- Has to replay the audio multiple times.
- Feels pressure to respond quickly.
- Needs to identify the important parts before listening.

#### Success Outcome

The user opens a chat and immediately understands what the voice notes are about, what needs a response, and which audio segments are worth playing.

### 4.2 Secondary User: Sender of Long Voice Notes

A person who sends detailed voice updates because speaking is easier than typing.

#### Pain Points

- Worries the recipient may not listen.
- Has to repeat themselves later.
- Important asks get buried.
- Emotional tone may not be understood if the recipient only skims text.

#### Success Outcome

The sender's voice note becomes easier for the recipient to understand and act on without losing the emotional richness of voice.

### 4.3 Tertiary User: Group Chat Participant

A user in a group chat where multiple people send audio updates.

#### Pain Points

- Many voice notes arrive from different people.
- Hard to know who asked what.
- Decisions and questions are scattered.
- Group planning becomes chaotic.

#### Success Outcome

The user can see grouped topics, detected questions, and decisions across multiple voice notes in a single catch-up card.

---

## 5. Jobs To Be Done

### JTBD 1: Understand Before Listening

When I receive several voice notes, I want to understand the topics and urgency before playing them so that I can decide whether to listen now or later.

### JTBD 2: Find Questions Quickly

When someone asks me questions inside a voice note, I want those questions extracted clearly so that I can reply without replaying the full audio.

### JTBD 3: Navigate Audio

When a voice note contains many topics, I want to jump to specific moments such as questions, decisions, or important updates so that I do not waste time listening to filler.

### JTBD 4: Preserve Emotion

When a sender's emotional tone matters, I want to understand whether they sound excited, stressed, upset, or urgent so that my reply matches the context.

### JTBD 5: Reply Faster

When I need to answer multiple questions from voice notes, I want WhatsApp to help me compose a response that covers all detected asks.

---

## 6. Product Principles

### 6.1 WhatsApp Native

The feature must feel like it belongs inside WhatsApp Web. It should reuse WhatsApp's visual grammar: chat bubbles, muted surfaces, green accents, rounded panels, message rows, timestamp style, waveform UI, and iconography.

### 6.2 Audio First, Text Second

The feature should not imply that audio is inferior. It should help users navigate audio while preserving the option to listen.

### 6.3 Actionable Over Generic

Avoid generic summaries like "They discussed wedding planning." Prefer actionable outputs like "Approve florist," "Review quote," or "Confirm guest count."

### 6.4 Grounded and Verifiable

Every extracted topic, decision, question, or suggested reply must be traceable to a voice note segment.

### 6.5 User Control

Users decide whether to listen, skip, reply, dismiss, or expand. The AI should assist, not force.

### 6.6 Privacy Respectful

The prototype should show privacy awareness. Avoid suggesting that private audio is sent to unknown services. For the demo, use seeded mock voice notes.

### 6.7 Calm Interaction

The product should reduce anxiety. Avoid aggressive urgency labels unless truly necessary.

---

## 7. UI Source of Truth

### 7.1 Attached UI Reference

Use the uploaded `WhatsApp-home-html.html` as the visual reference for WhatsApp Web. The file identifies the product as WhatsApp Web, includes WhatsApp Web metadata, theme color declarations, light and dark splash-screen variables, WhatsApp branding, and the end-to-end encrypted startup state.

Important visual details from the reference:

- Page identity: `WhatsApp Web`.
- App root: `html id="whatsapp-web"`.
- Theme colors:
  - Light theme: `#f7f5f3`.
  - Dark theme: `#12181c` and startup dark surface values.
- Splash-screen light background: `#F7F5F3`.
- Splash-screen dark background: `#0A1014` and `#161717`.
- WhatsApp progress/accent green values:
  - `#00c298`.
  - `#1DAA61`.
  - `#21C063`.
  - `#0b846d`.
- Secondary text values:
  - Light: `#5B6368`.
  - Dark: `#8D9599`.
- Startup lock copy: `End-to-end encrypted`.

### 7.2 UI Fidelity Requirement

The prototype must not look like a custom chat app inspired by WhatsApp. It should look like WhatsApp Web with one native new feature.

This means:

- Do not use generic SaaS dashboards.
- Do not use heavy AI branding.
- Do not use bright gradients.
- Do not use large cards that feel unlike WhatsApp.
- Do not use a different typography system.
- Do not use Material UI default styling unless heavily customized.
- Do not introduce colors that fight WhatsApp's palette.
- Do not place the feature in a way that breaks WhatsApp's chat flow.

---

## 8. Visual Design System

### 8.1 Layout Foundations

The product should be built around WhatsApp Web's desktop layout:

1. Full viewport web app.
2. Left chat navigation area.
3. Main conversation area.
4. Optional right-side contextual panel for Catch Up details.
5. Light and dark mode support.
6. Rounded app surfaces and soft separators.

### 8.2 Recommended Desktop Dimensions

Primary target viewport:

- 1440px wide by 900px tall.
- Must also work at 1366px by 768px.
- Must not break at 1280px wide.

Layout widths:

- Left chat list column: 30% of viewport, minimum 320px, maximum 420px.
- Conversation area: remaining width when no panel is open.
- Catch Up right panel: 360px to 420px.
- If right panel is open, conversation area shrinks.
- Minimum usable conversation width: 520px.

### 8.3 App Background

Use a WhatsApp Web-like background.

Light mode:

- Outer app background: `#f7f5f3`.
- Primary panel background: `#ffffff`.
- Secondary panel background: `#f0f2f5` or equivalent soft neutral.
- Search field background: `#f0f2f5`.
- Border/divider: `#e9edef`.

Dark mode:

- App background: `#0a1014`.
- Primary panel background: `#111b21`.
- Secondary panel background: `#202c33`.
- Search field background: `#202c33`.
- Border/divider: `#233138`.

### 8.4 Accent Colors

Use WhatsApp green sparingly.

Primary green:

- `#00a884` or `#1DAA61` style WhatsApp green.
- Use for primary actions, active states, unread counts, and Catch Up availability.

Secondary green:

- `#21C063`.
- Use for progress or success.

Dark mode green:

- `#0b846d`.
- Use for subdued active states.

Do not overuse green in every card. The app should still feel calm.

### 8.5 Typography

Use system fonts similar to WhatsApp Web.

Recommended stack:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
```

Typography sizes:

- App title: 22px to 24px, weight 600.
- Chat list contact name: 16px, weight 400 to 500.
- Chat preview: 14px, weight 400.
- Chat timestamp: 12px.
- Conversation header contact: 16px, weight 500.
- Message bubble text: 14.2px to 15px.
- Catch Up panel title: 18px to 20px, weight 600.
- Catch Up card title: 15px to 16px, weight 600.
- Catch Up metadata: 12px to 13px.
- Chip text: 12px to 13px.
- Button text: 14px, weight 500.

Text colors:

Light mode:

- Primary text: `#111b21`.
- Secondary text: `#667781`.
- Tertiary text: `#8696a0`.
- Inverse text on green: `#ffffff`.

Dark mode:

- Primary text: `#e9edef`.
- Secondary text: `#8696a0`.
- Tertiary text: `#667781`.

### 8.6 Spacing

Use a compact messaging UI spacing system.

Base spacing unit: 4px.

Common values:

- 4px: micro gaps.
- 8px: icon-to-text spacing.
- 12px: row horizontal padding.
- 16px: section padding.
- 20px: panel header padding.
- 24px: large section spacing.

Do not use overly large SaaS spacing. WhatsApp Web is dense but readable.

### 8.7 Border Radius

Use rounded but not overly playful shapes.

- Chat list avatar: 50%.
- Search input: 8px to 12px.
- Message bubbles: 7.5px to 12px.
- Catch Up card: 12px.
- Chips: 999px.
- Primary buttons: 24px.
- Panel containers: 0px if docked, 12px if floating.

### 8.8 Shadows

WhatsApp Web is mostly flat.

Use shadows only for:

- Floating menus.
- Context popovers.
- Modal overlays.
- Active Catch Up expanded card if needed.

Recommended subtle shadow:

```css
box-shadow: 0 2px 8px rgba(11, 20, 26, 0.12);
```

Do not use heavy SaaS card shadows.

---

## 9. WhatsApp Web Shell Requirements

### 9.1 Startup Screen

The attached reference includes WhatsApp Web startup branding and the end-to-end encrypted message. The prototype should optionally include a brief mock startup state for polish.

Startup screen elements:

- Centered WhatsApp logo.
- Text: `WhatsApp`.
- Progress bar.
- Footer row with lock icon and text: `End-to-end encrypted`.

Light mode:

- Background: `#F7F5F3`.
- Primary text: `#0A0A0A`.
- Secondary text: `#5B6368`.
- Progress background: `#e9edef`.
- Progress fill: `#00c298`.

Dark mode:

- Background: `#0A1014` or `#161717`.
- Primary text: `#F7F8FA`.
- Secondary text: `#8D9599`.
- Progress background: `#233138`.
- Progress fill: `#0b846d`.

Acceptance criteria:

- Startup screen appears for 600ms to 1200ms on first load.
- It must not block development.
- It can be disabled with a config flag.

### 9.2 Main App Structure

The main app must include:

1. Left vertical navigation rail.
2. Chat list panel.
3. Main conversation panel.
4. Optional Catch Up side panel.

Modern WhatsApp Web often includes a narrow left navigation rail with icons for chats, status, channels, communities, and settings. The prototype should include this to increase fidelity.

### 9.3 Left Navigation Rail

Width:

- 64px to 72px.

Background:

- Light: `#f0f2f5`.
- Dark: `#202c33`.

Items, top to bottom:

1. Chats.
2. Status.
3. Channels.
4. Communities.
5. Catch Up, optional if using global mode.
6. Settings, bottom.
7. Profile avatar, bottom.

Icon style:

- Stroke icons.
- 24px.
- Muted gray by default.
- Active icon uses WhatsApp green or primary text.
- Active item can show a small rounded background.

Hover:

- Circle background.
- Light mode: `rgba(11, 20, 26, 0.08)`.
- Dark mode: `rgba(233, 237, 239, 0.08)`.

Catch Up rail icon:

- Use waveform, sparkle, or headphones icon.
- Avoid magic-wand if it looks too generic AI.
- Label tooltip: `Catch Up`.

### 9.4 Chat List Panel

Width:

- 320px to 420px.
- Full height.
- Border-right: 1px solid divider.

Header height:

- 64px.

Header content:

- Title: `Chats`.
- Right icons:
  - New chat.
  - Filter or menu.
  - More.

Search area:

- Height: 48px to 56px.
- Search input with placeholder: `Search or start a new chat`.
- Rounded rectangle.
- Leading search icon.
- Background: soft panel gray.

Filter chips row:

- Optional but recommended.
- Chips:
  - All.
  - Unread.
  - Favorites.
  - Groups.
  - Catch Up.
- The `Catch Up` chip filters conversations that have voice notes with generated catch-up cards.

### 9.5 Chat Row

Each chat row must include:

1. Avatar.
2. Contact or group name.
3. Timestamp.
4. Last message preview.
5. Optional unread badge.
6. Optional pin/mute indicators.
7. Optional Catch Up badge.

Dimensions:

- Row height: 72px.
- Horizontal padding: 12px.
- Avatar: 49px.
- Gap between avatar and text: 12px.
- Top text row: contact name and timestamp.
- Bottom text row: preview and badges.

Hover state:

- Light mode: `#f5f6f6`.
- Dark mode: `#202c33` or slightly lighter.

Selected state:

- Light mode: `#f0f2f5`.
- Dark mode: `#2a3942`.

### 9.6 Catch Up Chat Row Badge

If a conversation has unread voice notes and Catch Up is available, show a subtle badge in the chat row.

Examples:

- `Catch Up`
- `5 voice notes`
- `12 min`
- `Needs reply`

Recommended layout:

Bottom row preview:

`🎙️ 7 voice notes · Catch Up available`

If urgent response needed:

`🎙️ 7 voice notes · 3 questions`

Badge style:

- Rounded pill.
- Green tint.
- Text size: 11px to 12px.
- Do not dominate the row.

### 9.7 Main Conversation Panel

Header height:

- 64px.

Header content:

- Contact avatar.
- Contact or group name.
- Presence text or participants.
- Search icon.
- Call icon, optional.
- More icon.

Conversation background:

- Use WhatsApp-style subtle patterned background if possible.
- Light mode base: `#efeae2`.
- Dark mode base: `#0b141a`.
- Pattern should be extremely subtle.
- If pattern is too hard, use a flat WhatsApp-like background.

Message area:

- Scrollable.
- Padding top: 12px.
- Padding horizontal: 5% to 8%, responsive.
- Message max width: 65%.
- Received messages align left.
- Sent messages align right.

Composer:

- Bottom bar height: 62px.
- Left icons:
  - Emoji.
  - Attachment.
- Input field:
  - Placeholder: `Type a message`.
  - Rounded pill.
- Right icon:
  - Mic or send depending on input.
- Background:
  - Light: `#f0f2f5`.
  - Dark: `#202c33`.

---

## 10. Voice Note UI Requirements

### 10.1 Voice Note Message Bubble

Voice note bubbles must look native to WhatsApp.

Required elements:

1. Play button.
2. Waveform.
3. Duration.
4. Timestamp.
5. Sender avatar or mic thumbnail when appropriate.
6. Playback speed indicator when playing.
7. Read receipt checkmarks for sent messages.
8. Optional Catch Up availability marker.

Received voice note bubble:

- Align left.
- Bubble background:
  - Light: `#ffffff`.
  - Dark: `#202c33`.

Sent voice note bubble:

- Align right.
- Bubble background:
  - Light: `#d9fdd3`.
  - Dark: `#005c4b`.

Waveform:

- Thin rounded bars or SVG waveform.
- Muted gray default.
- Active played portion uses green or darker tint.
- Must not look like a music player waveform from another app.

Play button:

- Circular.
- 36px to 40px.
- Icon centered.
- Background transparent or subtle.
- For received: icon color gray/green.
- For sent: icon color WhatsApp dark green.

Duration:

- Example: `2:14`.
- Font size: 12px.
- Secondary text.

Timestamp:

- Font size: 11px.
- Bottom right inside bubble.

### 10.2 Multiple Voice Note Cluster

When several voice notes arrive back-to-back from the same person, the UI should visually cluster them.

Rules:

- First bubble has normal top radius.
- Middle bubbles have reduced vertical gap.
- Last bubble has normal bottom radius.
- Sender avatar appears only once for the cluster if appropriate.
- Catch Up card appears after the cluster, not after every individual voice note.

### 10.3 Voice Note Group Header

For long clusters, show a subtle grouping label above the Catch Up card.

Example:

`7 voice notes · 18 min total`

This text should be small, muted, and centered or aligned near the received message cluster.

---

## 11. Catch Up Core Experience

### 11.1 Entry Points

Catch Up can be opened from four places:

1. Chat row badge.
2. Inline Catch Up card below voice-note cluster.
3. Voice note long-press or context menu.
4. Global Catch Up filter in chat list.

### 11.2 Hero Moment

The hero moment should occur when a user opens a chat with many voice notes.

Instead of only seeing a stack of audio bubbles, the user sees:

- The voice-note cluster.
- A native WhatsApp-style Catch Up card.
- Topics discussed.
- Questions requiring response.
- Decisions or updates.
- Emotional tone.
- Buttons to play full, play important parts, or reply.

Example card:

```text
Catch Up
Prajakta sent 7 voice notes · 18 min

Topics
Wedding venue
Florist quote
Guest count

Needs your input
Approve florist
Review payment quote
Confirm RSVP estimate

Tone
Excited, slightly stressed

[Play important parts] [Reply]
```

### 11.3 Inline Catch Up Card

The inline card appears inside the conversation, below the voice note cluster.

Visual requirements:

- Align left if summarizing received messages.
- Max width: 420px to 480px.
- Background:
  - Light: `#ffffff`.
  - Dark: `#202c33`.
- Border:
  - Light: `1px solid #e9edef`.
  - Dark: `1px solid #2a3942`.
- Border radius: 12px.
- Padding: 12px to 14px.
- Header row includes small icon and `Catch Up`.
- Use a green accent line or small icon, not a heavy colored header.
- Timestamp appears like a message timestamp.
- Should feel like a special WhatsApp message bubble.

### 11.4 Catch Up Card Sections

The card should include the following sections.

#### Section 1: Audio Summary Header

Fields:

- Sender name.
- Number of voice notes.
- Total duration.
- Generated status.

Example:

`Prajakta sent 7 voice notes · 18 min total`

Optional generated status:

`Catch Up ready`

#### Section 2: Topics

Shows the top 3 to 5 topics.

Example:

- Wedding venue finalized.
- Florist quote changed.
- Guest count increased.
- Makeup artist availability.
- Payment timing.

UI:

- Use compact rows.
- Each row can have a small dot or topic icon.
- Do not use large cards inside the card.

#### Section 3: Needs Your Input

This is the most important section.

Shows questions or asks directed at the recipient.

Example:

- Approve florist by tonight.
- Review payment quote.
- Confirm guest count estimate.

UI:

- Use checkbox-like circles or question icons.
- If there are no questions, show: `No direct response needed`.

#### Section 4: Decisions and Updates

Shows decisions already made or key updates.

Example:

- Venue date confirmed.
- Vendor B selected.
- Quote increased by $400.

UI:

- Use check icons or neutral update icons.

#### Section 5: Tone

Shows emotional tone.

Examples:

- Excited.
- Stressed.
- Frustrated.
- Casual.
- Urgent.
- Happy.
- Concerned.

UI:

- Use chips.
- Keep this subtle.
- Avoid overclaiming emotional states.
- Prefer "Sounds excited" instead of "She is excited" if needed.

#### Section 6: Actions

Primary actions:

- `Play important parts`
- `Reply`

Secondary actions:

- `Play full`
- `View transcript`
- `Jump to questions`

Button style:

- Primary: WhatsApp green text or green filled pill depending on importance.
- Secondary: neutral text button.
- Buttons should match WhatsApp's simple action style.

### 11.5 Expanded Catch Up Panel

Clicking the inline card opens a right-side details panel.

Panel title:

`Voice Note Catch-Up`

Panel width:

- 380px to 420px.

Panel sections:

1. Header summary.
2. Playback navigation.
3. Questions.
4. Decisions.
5. Topic timeline.
6. Transcript snippets.
7. Suggested reply.

Panel should feel like a WhatsApp context panel, similar to contact info or media info side panel.

---

## 12. Catch Up Right Panel Requirements

### 12.1 Panel Header

Content:

- Back or close icon.
- Title: `Catch Up`.
- Subtitle: `7 voice notes · 18 min`.
- More icon.

Header height:

- 64px.

Background:

- Same as chat header.

### 12.2 Audio Navigation Module

This module helps users play targeted sections.

Actions:

1. `Play full`
2. `Play important parts`
3. `Play questions`
4. `Play decisions`
5. `Skip greetings`

UI:

- Use stacked buttons or segmented chips.
- Active option highlighted in green.
- Show estimated playback time.

Example:

- Full: `18 min`.
- Important parts: `3 min`.
- Questions: `52 sec`.
- Decisions: `1 min 15 sec`.

### 12.3 Topic Timeline

A timeline of detected segments.

Each timeline item:

- Timestamp start.
- Timestamp end.
- Topic label.
- One-line summary.
- Play icon.
- Confidence indicator optional.

Example:

`00:12 - 01:45 · Venue`
`Venue is confirmed for Dec 14.`

`04:20 - 05:10 · Question`
`She asks you to approve the florist.`

### 12.4 Questions Section

Shows all detected questions requiring response.

Each question card:

- Question text.
- Timestamp.
- Sender.
- Suggested short answer if possible.
- Action:
  - Reply to this.
  - Play segment.
  - Mark answered.

Example:

Question:
`Can you approve the florist quote tonight?`

Suggested reply:
`Yes, this works for me. Please go ahead with the florist.`

### 12.5 Decisions Section

Shows decisions made in the voice notes.

Each decision item:

- Decision.
- Confidence.
- Timestamp.
- Related topic.
- Play segment.

Example:

`Venue date is finalized for Dec 14.`

### 12.6 Suggested Reply Section

A reply composer helper that consolidates response-needed items.

Modes:

1. Short reply.
2. Detailed reply.
3. Warm reply.
4. Point-by-point reply.

Example generated reply:

`This sounds good. I am okay with the florist quote. Please send me the final payment amount once you have it. For guest count, let us plan around 180 for now.`

Requirements:

- Suggested reply must be editable.
- It must not auto-send.
- It must not invent decisions.
- It must not say "I listened to everything" unless user played the full audio.
- It must cover all checked questions.
- User can uncheck questions before generating reply.

### 12.7 Transcript Section

Transcript is secondary, not primary.

Requirements:

- Collapsed by default.
- Header: `Transcript`.
- Shows timestamped snippets.
- Highlight questions and decisions.
- Allow search within transcript.
- Provide disclaimer: `Transcript may not be perfect.`

### 12.8 Panel Footer

Footer actions:

- `Reply`
- `Close`

If reply is generated:

- Footer may show `Insert reply`.

---

## 13. Chat Composer Integration

### 13.1 Reply Flow

When user clicks `Reply` from Catch Up:

1. A bottom sheet or inline reply helper opens above the composer.
2. Detected questions appear with checkboxes.
3. User selects what to answer.
4. Suggested reply is generated.
5. Reply text is inserted into composer.
6. User can edit.
7. Send button appears.
8. In MVP, send action appends a mock sent message.

### 13.2 Inline Reply Helper

UI placement:

- Above the message composer.
- Full width of conversation area.
- Background:
  - Light: `#ffffff`.
  - Dark: `#202c33`.
- Border-top: 1px solid divider.
- Compact height: 160px to 240px.

Content:

- Title: `Reply to voice notes`
- Selected questions count.
- Generated response preview.
- Buttons:
  - `Insert`
  - `Regenerate`
  - `Cancel`

### 13.3 Composer Behavior

If text is inserted:

- Input expands vertically if needed.
- Mic icon becomes send icon.
- Send button turns green.
- Cursor appears at end of inserted text.

### 13.4 Send Simulation

MVP behavior:

- Clicking send adds a sent text bubble.
- The sent message references the selected questions implicitly.
- The Catch Up card updates `3 questions answered`.
- The chat list preview updates to the sent message.
- No real message is sent.

---

## 14. Global Catch Up View

### 14.1 Purpose

Allow the user to see all chats that have pending voice-note catch-ups.

### 14.2 Entry Points

- Left rail Catch Up icon.
- Chat list filter chip: `Catch Up`.
- Search results.

### 14.3 Layout

The global view appears in the chat list panel, not as a separate dashboard.

Header:

`Catch Up`

Subtitle:

`Voice notes that need attention`

Rows:

Each row represents a chat with pending voice notes.

Row fields:

- Avatar.
- Contact or group.
- Number of voice notes.
- Total duration.
- Questions count.
- Most important topic.
- Time received.

Example row:

`Prajakta`
`7 voice notes · 18 min · 3 questions`
`Wedding venue, florist, guest count`

### 14.4 Empty State

Message:

`No voice notes to catch up on`

Subtext:

`New long voice notes will appear here when Catch Up is available.`

---

## 15. AI and Intelligence Requirements

### 15.1 MVP AI Simulation

The MVP can use deterministic mock data rather than real AI.

Create a local function:

```ts
generateCatchUp(voiceNoteCluster): CatchUpResult
```

This function should return seeded results for specific mock conversations.

### 15.2 Future AI Pipeline

If real AI is added later, the pipeline should be:

1. Audio input.
2. Speech-to-text transcription.
3. Speaker identification if group voice messages are used.
4. Segment detection.
5. Topic extraction.
6. Question extraction.
7. Decision extraction.
8. Action item extraction.
9. Emotional tone classification.
10. Importance ranking.
11. Suggested reply generation.
12. Grounding and timestamp mapping.

### 15.3 Required AI Output Object

```ts
type CatchUpResult = {
  id: string;
  chatId: string;
  senderName: string;
  voiceNoteIds: string[];
  totalDurationSeconds: number;
  generatedAt: string;
  status: "ready" | "generating" | "failed";
  headline: string;
  topics: CatchUpTopic[];
  questions: CatchUpQuestion[];
  decisions: CatchUpDecision[];
  updates: CatchUpUpdate[];
  tone: CatchUpTone[];
  importantSegments: AudioSegment[];
  suggestedReplies: SuggestedReply[];
  transcript?: TranscriptSegment[];
  confidence: number;
};
```

### 15.4 Topic Object

```ts
type CatchUpTopic = {
  id: string;
  label: string;
  summary: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  importance: "low" | "medium" | "high";
};
```

### 15.5 Question Object

```ts
type CatchUpQuestion = {
  id: string;
  questionText: string;
  normalizedAsk: string;
  directedAtUser: boolean;
  startTimeSeconds: number;
  endTimeSeconds: number;
  suggestedAnswer?: string;
  status: "open" | "answered" | "dismissed";
  confidence: number;
};
```

### 15.6 Decision Object

```ts
type CatchUpDecision = {
  id: string;
  decisionText: string;
  startTimeSeconds: number;
  endTimeSeconds: number;
  confidence: number;
};
```

### 15.7 Tone Object

```ts
type CatchUpTone = {
  label: "excited" | "stressed" | "casual" | "urgent" | "happy" | "concerned" | "frustrated";
  evidence: string;
  confidence: number;
};
```

### 15.8 Suggested Reply Object

```ts
type SuggestedReply = {
  id: string;
  mode: "short" | "detailed" | "warm" | "point_by_point";
  text: string;
  coversQuestionIds: string[];
};
```

### 15.9 Grounding Requirement

Every topic, question, decision, update, and tone inference must include:

- Associated voice note ID.
- Start timestamp.
- End timestamp.
- Confidence.
- Optional transcript snippet.

### 15.10 Hallucination Prevention

The system must not:

- Invent questions.
- Invent decisions.
- Invent payment amounts.
- Invent dates.
- Invent names.
- Invent emotional states with certainty.
- Claim that the recipient agreed to something unless they sent it.
- Suggest a reply that commits the user to something not selected.

---

## 16. Audio Playback Requirements

### 16.1 Full Playback

User can play each original voice note normally.

### 16.2 Targeted Playback

User can play a generated audio sequence consisting of important segments only.

MVP can simulate this with:

- Highlighted waveform playback.
- Segment timer.
- Mock audio progress.
- No actual audio file required if not available.

### 16.3 Segment Jumping

Clicking a topic, question, or decision should:

1. Scroll to the relevant voice note.
2. Highlight the voice bubble.
3. Set waveform progress to the timestamp.
4. Show a small label: `Question starts here`.
5. Begin mock playback if user selected play.

### 16.4 Playback Speeds

Support visual controls:

- 1x.
- 1.5x.
- 2x.

### 16.5 Skip Greetings

`Skip greetings` should jump past low-information openings.

Examples:

- "Hey, how are you?"
- "Sorry, one more thing."
- "Actually I forgot to mention."

This can be simulated with segments marked as filler.

---

## 17. Information Architecture

### 17.1 Chat List State

Primary states:

- All chats.
- Unread.
- Favorites.
- Groups.
- Catch Up.

### 17.2 Conversation State

Primary states:

- No chat selected.
- Chat selected with normal messages.
- Chat selected with voice notes.
- Chat selected with Catch Up card.
- Chat selected with Catch Up panel open.
- Reply helper open.

### 17.3 Catch Up State

Catch Up can be:

- Not available.
- Generating.
- Ready.
- Failed.
- Dismissed.
- Answered.
- Partially answered.

### 17.4 Voice Note Cluster State

Voice note cluster can be:

- Unplayed.
- Partially played.
- Fully played.
- Catch Up available.
- Catch Up opened.
- Questions answered.

---

## 18. Component Requirements

### 18.1 AppShell

Responsibilities:

- Controls layout.
- Handles light/dark theme.
- Shows startup screen optionally.
- Renders navigation rail, chat list, conversation, and side panel.

### 18.2 NavigationRail

Props:

- activeSection.
- unreadCount.
- catchUpCount.
- onSelectSection.

### 18.3 ChatList

Props:

- chats.
- selectedChatId.
- activeFilter.
- onSelectChat.
- onSelectFilter.

### 18.4 ChatRow

Props:

- chat.
- isSelected.
- catchUpSummary.
- unreadCount.
- timestamp.
- lastMessage.

Must render:

- Avatar.
- Name.
- Preview.
- Timestamp.
- Catch Up badge when applicable.

### 18.5 ConversationView

Props:

- chat.
- messages.
- catchUpResults.
- selectedCatchUpId.
- onOpenCatchUp.
- onPlaySegment.
- onReplyFromCatchUp.

### 18.6 MessageBubble

Props:

- message.
- direction.
- showAvatar.
- isClustered.
- isHighlighted.

### 18.7 VoiceNoteBubble

Props:

- voiceNote.
- direction.
- playbackState.
- onPlay.
- onSeek.
- onOpenMenu.

Must render waveform and duration.

### 18.8 VoiceNoteCluster

Props:

- voiceNotes.
- catchUpResult.
- onOpenCatchUp.

Must render clustered voice notes and inline Catch Up card.

### 18.9 CatchUpInlineCard

Props:

- catchUpResult.
- compact.
- onOpenPanel.
- onPlayImportantParts.
- onReply.

### 18.10 CatchUpPanel

Props:

- catchUpResult.
- selectedSegmentId.
- onClose.
- onPlaySegment.
- onGenerateReply.
- onMarkQuestionAnswered.

### 18.11 CatchUpTimeline

Props:

- segments.
- onPlaySegment.

### 18.12 QuestionList

Props:

- questions.
- selectedQuestionIds.
- onToggleQuestion.
- onReplyToQuestion.

### 18.13 SuggestedReplyComposer

Props:

- suggestedReplies.
- selectedMode.
- selectedQuestions.
- onInsertReply.
- onRegenerate.
- onCancel.

### 18.14 ChatComposer

Props:

- value.
- onChange.
- onSend.
- replyDraft.
- isReplyHelperOpen.

### 18.15 Toast

Used for:

- `Catch Up dismissed`
- `Reply inserted`
- `Questions marked answered`
- `Could not generate Catch Up`

---

## 19. Seed Data Requirements

### 19.1 Required Conversations

Create at least 8 seeded chats.

#### Chat 1: Prajakta

Scenario:

Wedding planning voice-note cluster.

Voice notes:

- 7 voice notes.
- 18 minutes total.

Catch Up output:

Topics:

- Wedding venue.
- Florist quote.
- Guest count.
- Makeup artist timing.
- Payment schedule.

Questions:

- Approve florist quote.
- Confirm RSVP estimate.
- Review payment amount.

Tone:

- Excited.
- Slightly stressed.

This should be the hero demo chat.

#### Chat 2: Eddie

Scenario:

Weekend plan coordination.

Voice notes:

- 3 voice notes.
- 5 minutes total.

Topics:

- Dinner location.
- Arrival time.
- Parking.

Questions:

- Confirm arrival time.
- Choose between two restaurants.

Tone:

- Casual.

#### Chat 3: Family Group

Scenario:

Family logistics.

Voice notes:

- 5 voice notes.
- 12 minutes total.

Topics:

- Travel plan.
- Hotel booking.
- Airport pickup.

Questions:

- Confirm pickup time.
- Share flight number.

Tone:

- Urgent but friendly.

#### Chat 4: Work PM Group

Scenario:

Product launch update.

Voice notes:

- 4 voice notes.
- 9 minutes total.

Topics:

- Launch timeline.
- Open bug.
- Design review.
- Metrics dashboard.

Questions:

- Review final PRD.
- Confirm launch checklist.

Tone:

- Focused.

#### Chat 5: Vendor

Scenario:

Wedding vendor quote.

Voice notes:

- 2 voice notes.
- 4 minutes total.

Topics:

- Price change.
- Availability.
- Payment deadline.

Questions:

- Confirm package.
- Pay deposit by Friday.

Tone:

- Formal.

#### Chat 6: Friend Chat

Scenario:

Long emotional update.

Voice notes:

- 6 voice notes.
- 15 minutes total.

Topics:

- Work stress.
- Weekend plan.
- Personal update.

Questions:

- No direct questions.

Tone:

- Stressed.

Catch Up should say:

`No direct response needed, but tone sounds stressed.`

#### Chat 7: Short Voice Note

Scenario:

Single 12-second voice note.

Catch Up should not appear automatically.

Reason:

Too short.

#### Chat 8: Text-only Chat

Scenario:

No voice notes.

Catch Up should not appear.

### 19.2 Message Data Fields

```ts
type Chat = {
  id: string;
  name: string;
  avatarUrl?: string;
  isGroup: boolean;
  participants?: string[];
  lastMessageAt: string;
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
  hasCatchUp: boolean;
  catchUpStatus?: "ready" | "generating" | "failed";
};
```

### 19.3 Voice Note Data Fields

```ts
type VoiceNote = {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  direction: "incoming" | "outgoing";
  durationSeconds: number;
  sentAt: string;
  waveform: number[];
  isPlayed: boolean;
  playbackProgressSeconds: number;
  clusterId?: string;
};
```

---

## 20. Feature Logic

### 20.1 Catch Up Availability Rules

Catch Up should appear if:

- A chat has at least 2 unplayed incoming voice notes, or
- A single incoming voice note is longer than 90 seconds, or
- Total unplayed incoming voice note duration exceeds 3 minutes, or
- A voice note contains detected questions, or
- User manually selects `Catch Up` from message menu.

Catch Up should not automatically appear if:

- Voice note is shorter than 30 seconds.
- Voice note is already fully played.
- Message is outgoing.
- Chat is muted and user has disabled muted chat catch-ups.
- Voice note is from archived chat and user has disabled archived catch-ups.

### 20.2 Catch Up Status Logic

#### Generating

Show skeleton card:

`Generating Catch Up...`

Include animated waveform or shimmer.

#### Ready

Show full Catch Up card.

#### Failed

Show error card:

`Could not generate Catch Up`

Actions:

- Try again.
- Play full.

#### Dismissed

Hide inline card but keep access in context menu.

#### Answered

Show compact state:

`3 questions answered`

### 20.3 Question Answering Logic

When user sends a reply from Catch Up:

- Mark selected questions as answered.
- Update Catch Up card.
- Update chat list badge.
- Add sent message bubble.
- Show toast: `Reply sent in prototype`.

---

## 21. Interaction Details

### 21.1 Opening Catch Up from Chat Row

Flow:

1. User sees `Catch Up` badge in chat list.
2. User clicks chat row.
3. Chat opens.
4. Conversation scrolls to latest voice-note cluster.
5. Inline Catch Up card is visible.
6. Card uses a subtle entrance animation.

### 21.2 Opening Catch Up Panel

Flow:

1. User clicks inline Catch Up card or `View details`.
2. Right panel slides in from right.
3. Conversation area shrinks.
4. Focus moves to panel title.
5. Selected card is highlighted.

Animation:

- Duration: 180ms to 240ms.
- Easing: ease-out.
- Respect reduced motion.

### 21.3 Playing Important Parts

Flow:

1. User clicks `Play important parts`.
2. The first important segment is highlighted.
3. Voice note bubble scrolls into view.
4. Playback progress animates.
5. Segment label appears.
6. After segment ends, next important segment plays.
7. Panel timeline updates active segment.

### 21.4 Replying to Questions

Flow:

1. User clicks `Reply`.
2. Reply helper opens above composer.
3. Questions appear checked by default.
4. User can uncheck questions.
5. Suggested reply appears.
6. User clicks `Insert`.
7. Text appears in composer.
8. User edits if desired.
9. User clicks send.
10. Mock sent message appears.

### 21.5 Dismissing Catch Up

Flow:

1. User opens card menu.
2. Selects `Dismiss Catch Up`.
3. Card disappears.
4. Toast appears: `Catch Up dismissed`.
5. Undo available for 5 seconds.

---

## 22. Menus and Microcopy

### 22.1 Voice Note Context Menu

Options:

- Play.
- Reply.
- React.
- Forward.
- Star.
- Catch Up.
- View transcript.
- Delete.

### 22.2 Catch Up Card Menu

Options:

- View details.
- Play full.
- Play important parts.
- Mark as listened.
- Dismiss.
- Report issue.

### 22.3 Microcopy Guidelines

Use simple, human language.

Good:

- `Needs your input`
- `Play important parts`
- `Jump to questions`
- `No direct response needed`
- `Tone sounds excited`
- `3 questions detected`

Avoid:

- `AI generated multimodal inference`
- `Semantic audio decomposition`
- `LLM analysis complete`
- `High-confidence intent extraction`

### 22.4 Required UI Copy

- `Catch Up`
- `Voice notes`
- `Topics`
- `Needs your input`
- `Decisions`
- `Updates`
- `Tone`
- `Play full`
- `Play important parts`
- `Jump to questions`
- `Reply`
- `View transcript`
- `No direct response needed`
- `Transcript may not be perfect`
- `End-to-end encrypted`
- `Search or start a new chat`
- `Type a message`

---

## 23. Empty States

### 23.1 No Chat Selected

Show WhatsApp-like empty state in conversation area.

Content:

- Illustration placeholder.
- Title: `WhatsApp for Web`
- Subtitle: `Send and receive messages without keeping your phone online.`
- Footer: lock icon and `End-to-end encrypted`.

### 23.2 No Catch Up Available in Chat

Message inside panel:

`No voice notes to catch up on`

Subtext:

`Long or multiple voice notes will appear here when Catch Up is available.`

### 23.3 No Questions Detected

In Catch Up card:

`No direct response needed`

Subtext:

`You can still play important parts or view the transcript.`

### 23.4 No Global Catch Ups

Global view:

`No voice notes to catch up on`

Subtext:

`You are caught up.`

---

## 24. Error States

### 24.1 Catch Up Generation Failed

Card:

`Could not generate Catch Up`

Subtext:

`You can still play the voice notes normally.`

Actions:

- `Try again`
- `Play full`

### 24.2 Transcript Unavailable

Message:

`Transcript unavailable`

Subtext:

`Audio playback still works.`

### 24.3 Reply Generation Failed

Message:

`Could not create a suggested reply`

Actions:

- `Try again`
- `Write manually`

### 24.4 Unsupported Audio

Message:

`Catch Up is not available for this voice note`

Possible reasons:

- Audio too short.
- Audio quality too low.
- Language not supported in prototype.

---

## 25. Accessibility Requirements

### 25.1 Keyboard Navigation

Users must be able to:

- Navigate chat list using keyboard.
- Open a chat.
- Open Catch Up card.
- Open and close side panel.
- Navigate questions.
- Toggle selected questions.
- Insert suggested reply.
- Send mock message.
- Close menus.

### 25.2 Focus Management

- Opening side panel moves focus to panel title.
- Closing side panel returns focus to triggering card.
- Opening menu traps focus inside menu until closed.
- Opening reply helper moves focus to generated reply.

### 25.3 Screen Reader Labels

Required labels:

- `Play voice note`
- `Pause voice note`
- `Voice note duration`
- `Open Catch Up`
- `Catch Up available`
- `Play important parts`
- `Question requiring response`
- `Decision detected`
- `Insert suggested reply`
- `Close Catch Up panel`

### 25.4 Color Contrast

- All text must meet WCAG AA.
- Do not rely on color alone for tone, questions, or decisions.
- Icons must have accessible labels.

### 25.5 Reduced Motion

If `prefers-reduced-motion` is enabled:

- Disable panel slide animation.
- Disable waveform animation.
- Disable shimmer.
- Use instant state changes.

---

## 26. Performance Requirements

### 26.1 Load Time

- Initial prototype load should be under 2 seconds locally.
- Startup screen should not exceed 1200ms.

### 26.2 Interaction Latency

- Opening chat: under 100ms.
- Opening Catch Up panel: under 150ms.
- Filtering Catch Up chats: under 100ms.
- Inserting reply: under 100ms.
- Mock generation: under 800ms.

### 26.3 Rendering

- Chat list should support at least 50 mock chats without lag.
- Conversation should support at least 100 messages.
- Use virtualization only if needed.

---

## 27. Technical Requirements

### 27.1 Recommended Stack

- React.
- TypeScript.
- Vite or Next.js.
- Tailwind CSS or CSS Modules.
- Local mock data.
- LocalStorage for state persistence.
- Lucide icons or custom SVG icons styled to match WhatsApp.

### 27.2 Folder Structure

Recommended:

```text
src/
  app/
    App.tsx
    routes.ts
  components/
    shell/
      AppShell.tsx
      StartupScreen.tsx
      NavigationRail.tsx
    chat-list/
      ChatList.tsx
      ChatRow.tsx
      ChatSearch.tsx
      ChatFilters.tsx
    conversation/
      ConversationView.tsx
      ConversationHeader.tsx
      MessageBubble.tsx
      VoiceNoteBubble.tsx
      VoiceNoteCluster.tsx
      ChatComposer.tsx
    catch-up/
      CatchUpInlineCard.tsx
      CatchUpPanel.tsx
      CatchUpTimeline.tsx
      QuestionList.tsx
      SuggestedReplyComposer.tsx
      TranscriptView.tsx
    shared/
      Avatar.tsx
      IconButton.tsx
      Menu.tsx
      Toast.tsx
      Chip.tsx
  data/
    chats.ts
    messages.ts
    catchUps.ts
  logic/
    generateCatchUp.ts
    playback.ts
    replyGenerator.ts
  styles/
    tokens.css
    globals.css
  types/
    chat.ts
    catchUp.ts
    message.ts
```

### 27.3 State Management

Required state:

```ts
type AppState = {
  activeSection: "chats" | "status" | "channels" | "communities" | "catch-up" | "settings";
  selectedChatId: string | null;
  selectedCatchUpId: string | null;
  isCatchUpPanelOpen: boolean;
  activeChatFilter: "all" | "unread" | "favorites" | "groups" | "catch-up";
  composerText: string;
  replyHelperOpen: boolean;
  selectedQuestionIds: string[];
  playbackState: PlaybackState;
  theme: "light" | "dark" | "system";
};
```

### 27.4 Local Storage Keys

Use namespaced keys:

- `whatsapp-catch-up:selected-chat`
- `whatsapp-catch-up:theme`
- `whatsapp-catch-up:dismissed-catchups`
- `whatsapp-catch-up:answered-questions`
- `whatsapp-catch-up:composer-draft`

### 27.5 No Real User Data

The prototype must use only mock data.

Do not request:

- Microphone access.
- Contacts access.
- WhatsApp login.
- Phone number.
- Real audio upload, unless explicitly added later as a local-only demo feature.

---

## 28. Analytics Requirements

### 28.1 Product Metrics

Activation:

- Catch Up card viewed.
- Catch Up panel opened.
- First important segment played.
- First reply inserted.

Engagement:

- Important parts played.
- Questions viewed.
- Suggested replies inserted.
- Transcript opened.
- Catch Up filter used.

Quality:

- Catch Up dismissed.
- Suggested reply edited.
- Questions unchecked.
- Segment played after topic click.

Outcome:

- Time from opening chat to reply.
- Percent of questions answered.
- Reduction in full audio playback needed.

### 28.2 Event Names

```text
catch_up_card_impression
catch_up_card_opened
catch_up_panel_opened
catch_up_play_full_clicked
catch_up_play_important_clicked
catch_up_question_played
catch_up_reply_started
catch_up_reply_inserted
catch_up_reply_sent_mock
catch_up_transcript_opened
catch_up_dismissed
catch_up_global_filter_opened
voice_note_segment_played
```

---

## 29. MVP Acceptance Criteria

### 29.1 Visual Fidelity

The prototype is acceptable only if:

- It looks like WhatsApp Web at first glance.
- The startup screen matches WhatsApp Web-style branding and encryption copy.
- The left navigation rail, chat list, conversation header, message bubbles, and composer feel native.
- Voice note bubbles resemble WhatsApp voice notes.
- Catch Up cards feel like native WhatsApp message elements, not generic AI cards.

### 29.2 Product Functionality

The MVP is acceptable only if:

- User can open a chat with multiple voice notes.
- User can see an inline Catch Up card.
- User can understand topics, questions, decisions, and tone.
- User can open a right-side Catch Up panel.
- User can play important parts in simulated form.
- User can jump to questions.
- User can generate and insert a suggested reply.
- User can send a mock reply.
- User can filter chats by Catch Up.
- User can dismiss a Catch Up card.

### 29.3 Grounding

The MVP is acceptable only if:

- Each question has a timestamp.
- Each decision has a timestamp.
- Each topic has a timestamp range.
- Suggested replies are based only on selected questions.
- The transcript, if shown, is clearly secondary.

---

## 30. V1 Extensions

### 30.1 Multi-Sender Group Catch Up

For group chats, Catch Up should separate voice notes by sender.

Example:

- Prajakta asked about florist.
- Eddie confirmed transport.
- Arpita raised guest-count concern.

### 30.2 Language Detection

Detect language and show:

`Voice notes include English and Hindi`

Future support:

- Hindi.
- Marathi.
- Punjabi.
- Hinglish.
- Spanish.
- Portuguese.

### 30.3 Regional Tone Preservation

Instead of translating everything into sterile English, preserve culturally meaningful phrasing.

Example:

`She sounds excited and says the venue feels "perfect for the family."`

### 30.4 Smart Reply Modes

Modes:

- Warm.
- Short.
- Detailed.
- Confirming.
- Apologetic.
- Point-by-point.

### 30.5 Memory Across Chats

If the same topic appears across multiple chats, link it.

Example:

`Florist was also discussed in Family Group.`

### 30.6 Calendar and Reminder Integration

If voice note contains deadline:

- `Remind me tonight`
- `Add to calendar`
- `Create follow-up`

### 30.7 Car Mode

Simplified audio-first mode:

- Reads topics aloud.
- Lets user say:
  - `Play questions`
  - `Reply yes`
  - `Save for later`

---

## 31. Portfolio Story

### 31.1 Product Intuition Statement

Voice notes have become a high-friction communication format because they are easy to send but hard to skim. WhatsApp Catch Up reimagines voice notes as structured, navigable conversations by extracting topics, questions, decisions, emotional tone, and reply-ready asks inside a WhatsApp-native interface.

### 31.2 What This Prototype Demonstrates

This project demonstrates:

- Consumer product intuition.
- AI product thinking.
- Audio UX.
- Messaging UX.
- WhatsApp Web UI fidelity.
- Information hierarchy.
- Action-oriented summarization.
- Conversational context design.
- Privacy-aware interaction.
- Reply workflow design.
- State management.
- High-fidelity prototyping.

### 31.3 Portfolio Tagline

**WhatsApp Catch Up: Voice notes that understand context.**

### 31.4 Best Case Study Framing

Do not frame this as:

`An AI voice note summarizer.`

Frame it as:

`A WhatsApp-native catch-up layer that turns long voice-note clusters into structured topics, questions, decisions, emotional tone, and reply-ready actions.`

### 31.5 Why This Feels Shippable

The feature fits naturally inside WhatsApp because:

- It extends an existing behavior.
- It keeps the chat interface intact.
- It respects audio as the original medium.
- It makes voice notes easier to respond to.
- It creates value without requiring users to change behavior.
- It solves a pain that millions of users already understand.

---

## 32. Suggested README Summary

```text
WhatsApp Catch Up is a high-fidelity product intuition prototype for WhatsApp Web. It solves the problem of long and multiple voice notes by turning audio into a structured, actionable catch-up experience.

The feature detects topics, questions, decisions, emotional tone, and important audio segments, then lets users play only what matters or generate a reply based on the questions they choose to answer.

The goal is not to replace listening. The goal is to make voice notes skimmable, navigable, and easier to respond to while preserving the native WhatsApp experience.
```

---

## 33. Build Sequence

### Phase 1: WhatsApp Web Shell

Build:

- Startup screen.
- App shell.
- Left rail.
- Chat list.
- Conversation view.
- Composer.
- Empty state.

Goal:

Make the app look like WhatsApp Web.

### Phase 2: Voice Notes

Build:

- Voice note bubbles.
- Waveforms.
- Playback state.
- Voice note clusters.
- Mock durations.
- Chat row voice note previews.

Goal:

Make audio feel native.

### Phase 3: Inline Catch Up Card

Build:

- Catch Up card.
- Topics.
- Questions.
- Decisions.
- Tone.
- Actions.

Goal:

Deliver the hero moment.

### Phase 4: Catch Up Panel

Build:

- Right side panel.
- Timeline.
- Questions.
- Decisions.
- Transcript.
- Playback navigation.

Goal:

Make the feature feel deep and usable.

### Phase 5: Reply Workflow

Build:

- Question selection.
- Suggested reply.
- Insert into composer.
- Mock send.
- Answered state.

Goal:

Turn understanding into action.

### Phase 6: Polish

Build:

- Hover states.
- Focus states.
- Dark mode.
- Empty states.
- Error states.
- Toasts.
- Animations.
- Responsive layout.

Goal:

Make it portfolio-ready.

---

## 34. Final MVP Definition

The MVP is complete when a user can open a WhatsApp Web-like interface, select a chat with multiple voice notes, see a native Catch Up card, understand what was said, identify what needs a response, play only important segments, and insert a suggested reply into the WhatsApp composer.

The final reaction should be:

`This feels like something WhatsApp should already have.`
