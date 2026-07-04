# WhatsApp Catch-Up Mobile UI Requirements

## Purpose

Create a high-fidelity mobile version of the WhatsApp Catch-Up prototype that feels native to WhatsApp on a phone-sized viewport while preserving the current desktop web experience. The mobile UI should not try to squeeze the desktop three-column layout into a phone. It should use a single-pane navigation model where chat list, conversation, catch-up detail, and reply helper are separate mobile surfaces.

This document is based on a live render audit of the current prototype at `390 x 844`, representative of an iPhone-sized viewport.

## Current Mobile Render Audit

### Viewport Tested

- Width: `390px`
- Height: `844px`
- URL: local Vite app on `localhost`
- Flow tested:
  - Initial chat list view
  - Ellie chat selection
  - Conversation render after selecting Ellie

### Current Behavior

The current app is desktop-first and does not yet have a mobile layout.

- The left navigation rail remains fixed at `64px`.
- The chat list keeps its desktop width of `400px`.
- On a `390px` viewport, the chat list starts at `x=64` and extends past the visible area.
- The root layout hides overflow, so the document itself does not horizontally scroll, but content is clipped.
- The conversation panel collapses to `0px` width after opening Ellie.
- Voice note bubbles and the catch-up inline card render offscreen with severely collapsed measured widths.
- The opened chat does not replace the chat list, so the user cannot actually use the conversation on mobile.

### Current Measured Issues

- Desktop shell is not responsive below tablet widths.
- Chat list is partially visible but clipped.
- Conversation is technically mounted but unusable at `0px` width.
- Message bubbles collapse instead of taking the mobile viewport width.
- Catch-up inline card becomes unreadable when conversation width is unavailable.
- Right-side catch-up panel cannot work as a fixed desktop side panel on mobile.
- Reply helper cannot fit as a desktop lower overlay when the conversation itself has no width.

### Product Implication

Mobile requires a dedicated responsive layout state, not only smaller widths for existing components.

## Target Mobile Experience

The mobile experience should mimic WhatsApp mobile interaction patterns:

- One primary surface visible at a time.
- Chat list opens first.
- Tapping a chat navigates into the conversation.
- The conversation has a native mobile top bar with a back button.
- Catch-up detail opens as a full-screen sheet or route-like panel.
- Reply helper opens as a bottom sheet anchored above the composer.
- Desktop navigation rail and desktop right panel are hidden on mobile.

## Responsive Breakpoints

### Mobile

- Range: `0px` to `767px`
- Layout: single-pane
- Visible surfaces:
  - Chat list
  - Conversation
  - Catch-up detail
  - Reply helper bottom sheet
- Desktop navigation rail: hidden
- Desktop right panel: hidden
- Desktop empty state: hidden unless there is no selected surface

### Tablet

- Range: `768px` to `1023px`
- Recommended layout: two-pane optional
- Chat list width: `320px` to `360px`
- Conversation fills remaining space
- Catch-up detail should still open as an overlay or sheet, not a permanent `420px` panel unless space allows.

### Desktop

- Range: `1024px+`
- Keep current desktop layout.
- Current audited desktop target is stable at `1280 x 720`.

## Navigation Model

### Mobile Surface State

Add an explicit mobile surface state rather than relying only on `selectedChatId`.

Recommended states:

- `chat-list`
- `conversation`
- `catch-up-detail`
- `global-catch-up`

The app can derive default state:

- If no chat is selected, show `chat-list`.
- If a chat is selected from the chat list, show `conversation`.
- If the inline catch-up card is tapped, show `catch-up-detail`.
- If the Catch Up entry point is tapped from the chat list, show `global-catch-up`.

### Back Behavior

Expected mobile back stack:

- From `conversation`, back returns to `chat-list`.
- From `catch-up-detail`, back returns to `conversation`.
- From `global-catch-up`, back returns to `chat-list`.
- If reply helper is open, back first dismisses the reply helper.
- If transcript search is focused, back clears focus before leaving the panel.

### Desktop Preservation

Desktop should continue using:

- Navigation rail
- Chat list
- Conversation
- Right-side catch-up panel

Do not regress current desktop behavior.

## Mobile Chat List Requirements

### Layout

- Width: `100vw`
- Height: `100dvh`
- No desktop navigation rail.
- Header height: approximately `56px` to `64px`.
- Search field below header, matching current WhatsApp mobile spacing.
- Filter chips horizontally scroll if needed.
- Chat rows use full width with native mobile density.

### Header

Header should include:

- Title: `Chats`
- Action icons:
  - Camera or new chat, if desired
  - Overflow menu
- Optional catch-up entry point if needed, but it should feel native and restrained.

### Chat Rows

Rows should preserve current native-looking preview behavior:

- Voice-note chats show a grey mic icon and `Voice message`.
- Catch-up should not be advertised with obvious AI labeling in the list.
- Unread badge should remain small, green, and right-aligned.
- Avatar size: `48px` to `52px`.
- Row height: approximately `72px`.
- Text must truncate cleanly.
- No horizontal clipping at `320px`, `360px`, `390px`, or `430px`.

### Global Catch-Up Entry

The global catch-up view should be reachable on mobile, but it should not rely on the desktop rail.

Acceptable options:

- A restrained filter chip named `Catch Up`.
- A top-right icon button with native styling.
- A row in the overflow menu.

The most consistent current option is to keep the existing `Catch Up` filter chip and make it open the global catch-up surface.

## Mobile Conversation Requirements

### Layout

- Width: `100vw`
- Height: `100dvh`
- Header fixed at top.
- Message scroll area fills available height.
- Composer fixed at bottom.
- Respect safe areas:
  - `env(safe-area-inset-top)`
  - `env(safe-area-inset-bottom)`
- Use `100dvh`, not only `100vh`, to handle mobile browser chrome.

### Conversation Header

Mobile header should include:

- Back arrow on the left.
- Avatar.
- Contact or group name.
- Subtitle, if applicable.
- Native action icons on the right:
  - Video
  - Call
  - Overflow menu

The header must not wrap or push icons offscreen at `320px`.

### Message Area

Requirements:

- Use the existing WhatsApp wallpaper treatment, but tune opacity for mobile readability.
- Maximum message bubble width should be based on viewport:
  - Incoming or outgoing text bubbles: `max-width: min(78vw, 360px)`
  - Voice note bubbles: `max-width: calc(100vw - 56px)`
  - Catch-up inline card: `max-width: calc(100vw - 56px)`
- Use left and right gutters of `8px` to `12px`.
- Preserve WhatsApp-style bubble radius and stacking.
- Date chips should stay centered and compact.
- The chat should open scrolled to the bottom, same as desktop.

### Voice Note Bubbles

Mobile voice notes should remain usable with touch targets:

- Play button touch target: at least `40px`.
- Waveform should flex to available width.
- Duration and timestamp must not overlap.
- At `320px`, waveform can shorten but play button and time metadata must remain visible.
- Active playback state should only appear after user action.
- Real audio should use the existing centralized audio player.
- If audio playback is blocked, simulated fallback should continue to advance the UI.

### Voice Note Cluster

The cluster label should be readable but not visually heavy:

- Example: `7 voice notes · 18 min total`
- Centered or aligned with the message lane.
- Must not consume excessive vertical space.

## Mobile Catch-Up Inline Card Requirements

### Placement

- Appears beneath the related voice-note cluster.
- Uses the incoming-message lane.
- Width: `max-width: calc(100vw - 56px)`.
- No desktop-only `ml-10` offset that can collapse the card.

### Visual Style

- Keep native system-bubble styling.
- No heavy border.
- No obvious AI-marketing treatment.
- Subtle shadow only.
- Background should match the active theme.

### Content

The inline card should remain concise on mobile:

- Header: `Summary of 7 voice notes (18 min)`
- One or two lines of topic summary.
- Up to three question/action rows.
- Long topic lists should truncate or wrap to two lines maximum.

### Interaction

- Entire card is tappable.
- Tapping opens full-screen catch-up detail.
- Card should provide visible pressed state.
- No custom CTA button is required.

## Mobile Catch-Up Detail Requirements

### Surface Type

On mobile, the desktop right panel should become a full-screen detail surface.

Recommended implementation:

- Full-screen panel with `position: fixed; inset: 0`.
- Header fixed at top.
- Content scrolls independently.
- Optional slide-in transition from right.

Alternative:

- Large bottom sheet at `92dvh`.

Full-screen is preferred because transcript, timeline, questions, and playback controls need vertical space.

### Header

Header should include:

- Back arrow or close button.
- Title: `Catch Up`.
- Optional chat context, such as `Ellie`.

Header height should be `56px` to `64px`.

### Hero Summary

Include:

- Catch-up title, for example `Wedding planning update`.
- Voice-note count and total duration.
- Primary playback button.
- Playback speed control.
- Skip greetings toggle.

Controls must be touch-friendly:

- Minimum control height: `44px`.
- Minimum icon button size: `40px`.

### Needs Your Input

Question rows should stack vertically.

Each row should include:

- Play segment icon.
- Question text.
- Optional suggested reply preview.
- Answered state.

Tap behavior:

- Tapping a row selects it.
- Selecting one or more questions opens the reply helper bottom sheet.
- Tapping the play icon seeks playback to that segment without forcing reply selection.

### Transcript

Transcript should be collapsible.

When expanded:

- Search field appears below the transcript header.
- Segments show timestamp, speaker, and text.
- Current playback segment is highlighted.
- Tapping a segment seeks playback.
- AI disclaimer appears at the bottom.

Transcript search must not cause horizontal overflow at `320px`.

## Mobile Reply Helper Requirements

### Surface Type

Use a bottom sheet, not a desktop floating card.

Recommended:

- Fixed to bottom.
- Width: `100vw`.
- Max height: `65dvh`.
- Rounded top corners only.
- Backdrop optional, but if used, keep it subtle.

### Content

Sheet should include:

- Header row:
  - `Drafting reply...`
  - selected question count
  - close icon
- Draft text area.
- Mode chips:
  - `Detailed`
  - `Short`
  - `Warm`
  - `Point-by-point`
- Actions:
  - `Discard`
  - `Insert`

### Behavior

- Sheet should sit above the composer when in conversation.
- In catch-up detail, sheet can sit above the detail surface controls.
- Mode chips wrap cleanly at `320px`.
- `Point-by-point` must keep exact casing.
- The text area must not shrink below a readable height.
- Keyboard appearance should not hide the action buttons.

## Mobile Composer Requirements

### Layout

- Fixed at bottom of conversation.
- Height adapts to one or multiple lines.
- Left icons should remain native and compact.
- Send/mic button should be at least `40px`.
- Use safe-area bottom padding.

### Insert Flow

When the user taps `Insert` in the reply helper:

- The draft appears in the composer.
- Selected question IDs are retained.
- Sending the message marks the selected questions as answered.
- The catch-up detail should reflect answered state if reopened.

## Mobile Global Catch-Up Requirements

### Layout

Full-screen list surface.

Header:

- Back arrow.
- Title: `Catch Up`.

List rows:

- Chat avatar.
- Chat name.
- Voice note count and total duration.
- Main topics.
- Timestamp or relative date.

### Filtering

If filters remain available:

- Use horizontally scrollable chips.
- Chips must fit without clipping.
- Active chip should match WhatsApp green styling.

### Row Tap

Tapping a row should:

- Open that chat conversation.
- Scroll to the related voice-note cluster.
- Optionally open catch-up detail if the row is explicitly detail-oriented.

Recommended default: open conversation at the cluster, not the detail panel, to preserve WhatsApp-native feel.

## Theme Requirements

### Light Mode

Preserve current WhatsApp Web palette:

- Green action color.
- Light panel background.
- WhatsApp-style chat wallpaper.
- Native grey secondary text.

### Dark Mode

Requirements:

- Wallpaper must remain very subdued.
- Text contrast must pass basic readability checks.
- Voice note waveform inactive bars must remain visible.
- Active green state must be visible but not neon.
- Bottom sheets and full-screen panels should use existing dark panel tokens.

## Accessibility Requirements

- All icon buttons need `aria-label`.
- Back and close controls need clear labels.
- Touch targets should be at least `40px`, preferably `44px`.
- Focus order should follow visible order.
- Escape/back behavior should close nested surfaces first.
- Reply helper should trap focus while open if implemented as a modal sheet.
- Text should support browser zoom without overlapping at `200%`.

## Performance Requirements

- Mobile transitions should be lightweight.
- Avoid mounting both desktop and mobile heavy panels if not needed.
- Message list should remain smooth with the current mock dataset.
- Audio time updates should not trigger unnecessary full-app layout churn.
- Use CSS transforms for surface transitions where possible.

## Implementation Guidance

### App Shell

Introduce responsive shell behavior:

- Desktop: keep current `AppShell`.
- Mobile: render a `MobileAppShell` or responsive branch inside `AppShell`.

Recommended component additions:

- `MobileAppShell`
- `MobileChatList`
- `MobileConversationView`
- `MobileCatchUpDetail`
- `MobileReplySheet`

Existing components can be reused if they accept responsive class overrides, but avoid forcing desktop layout assumptions into mobile.

### State

Add explicit UI state:

```ts
type MobileSurface =
  | 'chat-list'
  | 'conversation'
  | 'catch-up-detail'
  | 'global-catch-up';
```

Possible state additions:

```ts
interface MobileUiState {
  surface: MobileSurface;
  previousSurface?: MobileSurface;
  replySheetOpen: boolean;
}
```

This can live in `App.tsx` initially, matching the prototype's current global state approach.

### CSS Strategy

- Use Tailwind responsive variants for simple changes.
- Use separate mobile components for structural changes.
- Avoid fixed desktop widths below `768px`.
- Replace `w-[400px]`, `w-[420px]`, and desktop rail assumptions on mobile.
- Audit every `ml-10`, `max-w-[340px]`, and fixed-width class inside message surfaces.

## Acceptance Criteria

### Required Viewports

Validate at:

- `320 x 568`
- `360 x 740`
- `390 x 844`
- `430 x 932`
- `768 x 1024`
- `1280 x 720`

### Layout Acceptance

For every required viewport:

- No document-level horizontal overflow.
- No clipped primary content.
- No text overlap.
- No controls outside viewport.
- Chat list fully usable on mobile.
- Conversation fully usable on mobile.
- Catch-up detail fully usable on mobile.
- Reply helper fully usable on mobile.
- Desktop layout remains unchanged at `1280px`.

### Interaction Acceptance

The following flows must pass on mobile:

1. Open app and see full-width chat list.
2. Tap Ellie and enter full-width conversation.
3. Tap back and return to chat list.
4. Reopen Ellie and verify chat auto-scrolls to the bottom.
5. Play a voice note and verify timer and waveform advance.
6. Tap catch-up inline card and open full-screen detail.
7. Play important parts from the detail surface.
8. Expand transcript and search transcript text.
9. Tap a question and open reply helper bottom sheet.
10. Switch reply modes, including exact `Point-by-point` casing.
11. Insert draft into composer.
12. Send reply and verify answered state.
13. Return to chat list without stale overlays.

### Visual Fidelity Acceptance

- Mobile surfaces should feel native to WhatsApp, not like resized desktop panels.
- Feature entry points should stay quiet and integrated.
- Catch-up content can have a custom hierarchy, but styling must remain WhatsApp-native.
- No AI sparkle or marketing visual treatment should appear in the chat list.
- The inline card should look like a native message/system bubble.

## Non-Goals

- Building a native iOS or Android app.
- Supporting real WhatsApp authentication.
- Uploading or recording new voice notes.
- Replacing the current desktop UI.
- Implementing production routing unless it helps the prototype structure.

## Recommended Build Order

1. Add mobile breakpoint detection and single-pane shell.
2. Make chat list full-width on mobile and hide navigation rail.
3. Add mobile conversation route with back behavior.
4. Fix mobile message, voice-note, and inline-card widths.
5. Convert catch-up right panel into full-screen mobile detail.
6. Convert reply helper into mobile bottom sheet.
7. Add mobile global catch-up surface.
8. Run viewport audit and fix overlap/overflow issues.
9. Re-run desktop audit to ensure no regression.

## Verification Checklist

Before considering mobile complete:

- `npm run build` passes.
- `npm run lint` passes.
- Browser audit at `390 x 844` returns no overflow issues.
- Browser audit at `320 x 568` returns no overflow issues.
- Screenshot review confirms no clipped headers, buttons, or bubbles.
- Audio playback or fallback advances correctly after a user tap.
- Reply helper mode buttons render exactly:
  - `Detailed`
  - `Short`
  - `Warm`
  - `Point-by-point`
- Desktop `1280 x 720` remains visually stable.
