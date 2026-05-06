# Fiesta Pulse History Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-screen Expo React Native web app with animated Cinco de Mayo history cards, local pulse stats, and a Vercel deploy path.

**Architecture:** Use Expo Router for the app shell, focused React Native components for the visual layers, and a tested pure state reducer for tap stats/history progression. Keep content and theme data in small modules so future edits are simple.

**Tech Stack:** Expo, React Native, Expo Router, TypeScript, Vitest, React Native Animated, Expo web export, Vercel.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `app.json`
- Create: `tsconfig.json`
- Create: `babel.config.js`
- Create: `index.js`
- Create: `app/_layout.tsx`

- [ ] Add Expo, React Native, Expo Router, TypeScript, and Vitest configuration.
- [ ] Install dependencies with `npm install`.

### Task 2: Tested App State

**Files:**
- Create: `src/fiestaState.test.ts`
- Create: `src/fiestaState.ts`

- [ ] Write tests for pulse increments, fact unlocks, and combo behavior.
- [ ] Run tests and confirm they fail before implementation.
- [ ] Implement the reducer and history content.
- [ ] Run tests and confirm they pass.

### Task 3: Components

**Files:**
- Create: `components/StatsStrip.tsx`
- Create: `components/HistoryCard.tsx`
- Create: `components/CelebrationButton.tsx`
- Create: `components/FloatingBanner.tsx`
- Create: `components/ConfettiBurst.tsx`

- [ ] Build small, prop-driven components with no global state.
- [ ] Use React Native primitives so web and native remain aligned.

### Task 4: Main Screen

**Files:**
- Create: `app/index.tsx`

- [ ] Compose the full-screen interactive scene.
- [ ] Wire taps to confetti, stats, combos, facts, and theme changes.
- [ ] Keep styling local and tweakable.

### Task 5: Build and Deploy

**Files:**
- Modify: `package.json`
- Create: `vercel.json`

- [ ] Add scripts for test, start, and web export.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Deploy to Vercel.
