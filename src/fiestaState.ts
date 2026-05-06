export type FiestaThemeId = "day" | "sunset" | "night";

export type HistoryCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  interactionLabel: string;
  accent: string;
};

export type FiestaState = {
  totalPulses: number;
  factsUnlocked: number;
  currentCombo: number;
  biggestCombo: number;
  lastPulseAt: number | null;
  themeId: FiestaThemeId;
};

export const HISTORY_CARDS: HistoryCard[] = [
  {
    id: "meaning",
    eyebrow: "May 5, 1862",
    title: "What Cinco de Mayo Marks",
    body:
      "Cinco de Mayo marks Mexico's victory over French forces at the Battle of Puebla.",
    interactionLabel: "Tap the date to light it up",
    accent: "#F2B84B"
  },
  {
    id: "zaragoza",
    eyebrow: "Puebla",
    title: "Zaragoza's Stand",
    body:
      "Mexican forces led by General Ignacio Zaragoza defeated a larger, better-equipped French army near Puebla.",
    interactionLabel: "Send a pulse across Puebla",
    accent: "#0B7A53"
  },
  {
    id: "independence",
    eyebrow: "Common mix-up",
    title: "Not Independence Day",
    body:
      "Mexico's Independence Day is September 16. Cinco de Mayo remembers the Battle of Puebla.",
    interactionLabel: "Flip the dates into place",
    accent: "#C83232"
  },
  {
    id: "celebration",
    eyebrow: "Then and now",
    title: "How People Celebrate",
    body:
      "In Puebla, the day includes parades and reenactments. In the United States, it also celebrates Mexican heritage and culture.",
    interactionLabel: "Fill the papel picado",
    accent: "#E85D9E"
  },
  {
    id: "symbol",
    eyebrow: "Lasting symbol",
    title: "Resistance and Pride",
    body:
      "The victory became a symbol of resistance to foreign domination, even though the wider conflict continued after 1862.",
    interactionLabel: "Hold the plaza glow",
    accent: "#16213E"
  }
];

export const createInitialFiestaState = (): FiestaState => ({
  totalPulses: 0,
  factsUnlocked: 0,
  currentCombo: 0,
  biggestCombo: 0,
  lastPulseAt: null,
  themeId: "sunset"
});

export const recordFiestaPulse = (
  state: FiestaState,
  occurredAt: number
): FiestaState => {
  const isCombo =
    state.lastPulseAt !== null && occurredAt - state.lastPulseAt <= 650;
  const currentCombo = isCombo ? state.currentCombo + 1 : 1;
  const factsUnlocked = Math.min(
    HISTORY_CARDS.length,
    Math.max(state.factsUnlocked, Math.min(HISTORY_CARDS.length, state.totalPulses + 1))
  );

  return {
    ...state,
    totalPulses: state.totalPulses + 1,
    factsUnlocked,
    currentCombo,
    biggestCombo: Math.max(state.biggestCombo, currentCombo),
    lastPulseAt: occurredAt
  };
};

export const getVisibleHistoryCards = (state: FiestaState): HistoryCard[] =>
  HISTORY_CARDS.slice(0, state.factsUnlocked);

export const nextTheme = (themeId: FiestaThemeId): FiestaThemeId => {
  if (themeId === "day") {
    return "sunset";
  }

  if (themeId === "sunset") {
    return "night";
  }

  return "day";
};
