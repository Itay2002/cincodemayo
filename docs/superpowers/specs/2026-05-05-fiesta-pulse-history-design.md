# Fiesta Pulse History Design

## Purpose

Build a one-screen Expo React Native app for Cinco de Mayo that can deploy to Vercel as a web app now and remain viable for native app-store builds later. The experience should feel festive and interactive while teaching the core history of the holiday.

## Concept

**Fiesta Pulse History** is a full-screen animated holiday scene. Users tap the screen or press a central celebration button to create confetti bursts, increase their Fiesta Pulses counter, and reveal short history cards about Cinco de Mayo.

The app should be polished, fast to build, and intentionally small.

## Platform

- Framework: Expo React Native
- Routing: Expo Router
- Deployment: Expo web export on Vercel
- Future native path: EAS Build for iOS and Android

## Main Screen

The first screen is the app. There is no landing page.

Visible elements:

- Full-screen illustrated plaza or fiesta background
- Animated papel picado banner layer near the top
- Local stats strip showing pulses, facts unlocked, and combo
- Swipeable or tappable history card area
- Central celebration button
- Lightweight theme toggle for Day Plaza, Puebla Sunset, and Night Fiesta

## Interactions

- Tap anywhere: create a confetti burst at the tap location and increment Fiesta Pulses.
- Press celebration button: trigger a larger pulse animation, bounce banners, brighten the scene, and reveal the next history card.
- Tap history card: animate the key date, name, or location inside the card.
- Change theme: shift colors and background overlay.
- Fast repeated taps: increase a visible combo counter.

## Stats

Use local/session stats only for the first release.

Tracked values:

- `totalPulses`
- `factsUnlocked`
- `biggestCombo`
- `currentCombo`

Do not add Supabase or auth for the first version. If time allows, persist stats with web `localStorage`; native persistence can use AsyncStorage later.

## History Cards

Use short, respectful, plain-language facts:

1. Cinco de Mayo marks Mexico's victory over French forces at the Battle of Puebla on May 5, 1862.
2. Mexican forces led by General Ignacio Zaragoza defeated a larger, better-equipped French army near Puebla.
3. Cinco de Mayo is not Mexican Independence Day. Mexico's Independence Day is September 16.
4. In Puebla, the day is marked with parades and reenactments. In the United States, it has also become a celebration of Mexican heritage and culture.
5. Optional: The victory became a symbol of resistance to foreign domination, even though the wider conflict continued after 1862.

Primary references:

- Britannica: Cinco de Mayo
- Britannica: Battle of Puebla
- History.com: Cinco de Mayo

## Components

- `app/index.tsx`: owns the main screen state and layout.
- `app/_layout.tsx`: Expo Router layout.
- `components/ConfettiBurst.tsx`: renders tap particles.
- `components/FloatingBanner.tsx`: renders drifting papel picado.
- `components/CelebrationButton.tsx`: central pulse trigger.
- `components/HistoryCard.tsx`: animated fact card.
- `components/StatsStrip.tsx`: local stats display.

## Animation Approach

Use the simplest animation stack that works quickly:

- Built-in React Native `Animated` for opacity, scale, translate, and pulse effects.
- Avoid complex physics or game loops.
- Confetti can be a small array of colored absolutely-positioned views that animate outward and fade.
- Papel picado can be a repeated row of colored blocks or a lightweight image strip moving horizontally.

## Visual Style

Use a festive but not one-note palette:

- Deep green: `#0B7A53`
- Warm red: `#C83232`
- Sun gold: `#F2B84B`
- Paper white: `#FFF7E8`
- Night navy: `#16213E`
- Accent pink: `#E85D9E`

The UI should feel mobile-first, touchable, and celebratory. Text should be concise and readable over the background.

## Deferred

- Global public counters
- Supabase
- Accounts
- Sound effects
- Native shake detection
- Share cards
- Full timeline mode

## Success Criteria

- The app launches directly into the interactive scene.
- Users can tap to create visible confetti and increment stats.
- The celebration button produces a larger animation.
- History cards teach the Battle of Puebla basics.
- The app can be exported for web and deployed to Vercel.
- The code structure does not block future iOS/Android builds.
