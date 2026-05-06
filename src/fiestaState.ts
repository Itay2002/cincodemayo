export type FiestaThemeId = "day" | "sunset" | "night";

export type HistoryCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  interactionLabel: string;
  accent: string;
  sourceLabel: string;
  sourceUrl: string;
  visualCue: string;
};

export type FiestaState = {
  totalPulses: number;
  factsUnlocked: number;
  currentCombo: number;
  biggestCombo: number;
  lastPulseAt: number | null;
  themeId: FiestaThemeId;
};

export const APP_TITLE = "2026 5 De Mayo Fiesta";

const HISTORY_SOURCE_LABEL = "History.com";
const HISTORY_SOURCE_URL = "https://www.history.com/articles/cinco-de-mayo";

const sourced = (card: Omit<HistoryCard, "sourceLabel" | "sourceUrl">) => ({
  ...card,
  sourceLabel: HISTORY_SOURCE_LABEL,
  sourceUrl: HISTORY_SOURCE_URL
});

export const HISTORY_CARDS: HistoryCard[] = [
  sourced({
    id: "independence-1810",
    eyebrow: "1810",
    title: "Independence Begins",
    body:
      "Miguel Hidalgo y Costilla's call to arms in 1810 began Mexico's fight for independence from Spanish colonial rule.",
    interactionLabel: "Start the timeline",
    accent: "#F2B84B",
    visualCue: "1810"
  }),
  sourced({
    id: "independence-day",
    eyebrow: "September 16",
    title: "The Other Big Date",
    body:
      "Mexico's Independence Day is September 16, not May 5. Cinco de Mayo remembers a later battle.",
    interactionLabel: "Flip the dates into place",
    accent: "#C83232",
    visualCue: "Sep 16"
  }),
  sourced({
    id: "juarez-elected",
    eyebrow: "1861",
    title: "Juarez Takes Office",
    body:
      "Benito Juarez, a Zapotec lawyer, was elected president of Mexico during a period of deep financial strain.",
    interactionLabel: "Light the capital",
    accent: "#0B7A53",
    visualCue: "Juarez"
  }),
  sourced({
    id: "debt-default",
    eyebrow: "1861",
    title: "Debt Payments Stop",
    body:
      "After years of internal conflict, Mexico paused debt payments to European governments.",
    interactionLabel: "Pulse the old papers",
    accent: "#E85D9E",
    visualCue: "Debt"
  }),
  sourced({
    id: "european-response",
    eyebrow: "1861",
    title: "Europe Responds",
    body:
      "France, Britain, and Spain sent naval forces to Veracruz to demand repayment from Mexico.",
    interactionLabel: "Send ships to Veracruz",
    accent: "#F2B84B",
    visualCue: "Ships"
  }),
  sourced({
    id: "britain-spain-withdraw",
    eyebrow: "1861",
    title: "Two Powers Withdraw",
    body:
      "Britain and Spain negotiated with Mexico and withdrew their forces after reaching an understanding.",
    interactionLabel: "Split the fleet",
    accent: "#0B7A53",
    visualCue: "2 Leave"
  }),
  sourced({
    id: "french-empire-plan",
    eyebrow: "1861",
    title: "France Stays",
    body:
      "Napoleon III saw the crisis as a chance to carve out a French-backed empire in Mexican territory.",
    interactionLabel: "Darken the skyline",
    accent: "#C83232",
    visualCue: "Empire"
  }),
  sourced({
    id: "veracruz-landing",
    eyebrow: "Late 1861",
    title: "Veracruz Falls",
    body:
      "A well-armed French fleet stormed Veracruz and landed a large force of troops.",
    interactionLabel: "Flash the coast",
    accent: "#16213E",
    visualCue: "Port"
  }),
  sourced({
    id: "juarez-retreat",
    eyebrow: "Late 1861",
    title: "Government Retreats",
    body:
      "The French advance pushed President Juarez and his government into retreat.",
    interactionLabel: "Move the capital light",
    accent: "#E85D9E",
    visualCue: "Retreat"
  }),
  sourced({
    id: "lorencez-marches",
    eyebrow: "1862",
    title: "Lorencez Marches",
    body:
      "About 6,000 French troops under General Charles Latrille de Lorencez marched toward Puebla de Los Angeles.",
    interactionLabel: "Count the marching lights",
    accent: "#F2B84B",
    visualCue: "6,000"
  }),
  sourced({
    id: "juarez-rallies-force",
    eyebrow: "1862",
    title: "Juarez Rallies Loyalists",
    body:
      "From his northern headquarters, Juarez gathered loyal fighters and sent them toward Puebla.",
    interactionLabel: "Send the pulse north",
    accent: "#0B7A53",
    visualCue: "Rally"
  }),
  sourced({
    id: "mexican-ranks",
    eyebrow: "1862",
    title: "A Smaller Force",
    body:
      "The size of the Mexican force is disputed, with estimates ranging from 2,000 to 5,000 soldiers.",
    interactionLabel: "Balance the numbers",
    accent: "#16213E",
    visualCue: "2k-5k"
  }),
  sourced({
    id: "zaragoza-fortifies",
    eyebrow: "May 1862",
    title: "Zaragoza Fortifies Puebla",
    body:
      "General Ignacio Zaragoza led the Mexican defense, fortifying Puebla before the French assault.",
    interactionLabel: "Build the defenses",
    accent: "#C83232",
    visualCue: "Walls"
  }),
  sourced({
    id: "may-5-assault",
    eyebrow: "May 5, 1862",
    title: "The Assault Begins",
    body:
      "On May 5, Lorencez brought his army and heavy artillery before Puebla and launched the attack.",
    interactionLabel: "Light the battle line",
    accent: "#F2B84B",
    visualCue: "May 5"
  }),
  sourced({
    id: "battle-duration",
    eyebrow: "May 5, 1862",
    title: "Daybreak to Evening",
    body: "The Battle of Puebla lasted from daybreak into the early evening.",
    interactionLabel: "Move the sun",
    accent: "#E85D9E",
    visualCue: "Dusk"
  }),
  sourced({
    id: "french-retreat",
    eyebrow: "May 5, 1862",
    title: "France Retreats",
    body: "By the end of the battle, French forces retreated from Puebla.",
    interactionLabel: "Burst the retreat sparks",
    accent: "#0B7A53",
    visualCue: "Retreat"
  }),
  sourced({
    id: "mexican-losses",
    eyebrow: "May 5, 1862",
    title: "The Toll",
    body:
      "France lost nearly 500 soldiers, while fewer than 100 Mexican soldiers were killed.",
    interactionLabel: "Scatter the sparks",
    accent: "#16213E",
    visualCue: "500"
  }),
  sourced({
    id: "symbolic-victory",
    eyebrow: "After May 5",
    title: "A Symbolic Victory",
    body:
      "Zaragoza's success was not a major strategic win, but it boosted Mexico's resistance movement.",
    interactionLabel: "Raise the morale pulse",
    accent: "#F2B84B",
    visualCue: "Resist"
  }),
  sourced({
    id: "maximilian-installed",
    eyebrow: "1864",
    title: "A French-Backed Emperor",
    body:
      "Napoleon III installed Austrian Archduke Ferdinand Maximilian as emperor of Mexico in 1864.",
    interactionLabel: "Dim the crown",
    accent: "#C83232",
    visualCue: "1864"
  }),
  sourced({
    id: "france-withdraws",
    eyebrow: "1867",
    title: "France Withdraws",
    body:
      "In 1867, France finally withdrew, helped in part by U.S. military support and political pressure after the Civil War.",
    interactionLabel: "Clear the horizon",
    accent: "#0B7A53",
    visualCue: "1867"
  }),
  sourced({
    id: "maximilian-executed",
    eyebrow: "1867",
    title: "Maximilian Falls",
    body:
      "That same year, Maximilian was captured and executed by forces loyal to Juarez.",
    interactionLabel: "Close the chapter",
    accent: "#E85D9E",
    visualCue: "End"
  }),
  sourced({
    id: "puebla-renamed",
    eyebrow: "After 1867",
    title: "Puebla Honors Zaragoza",
    body:
      "Puebla de Los Angeles was renamed for General Zaragoza, who died of typhoid fever months after the battle.",
    interactionLabel: "Mark the city",
    accent: "#F2B84B",
    visualCue: "Name"
  }),
  sourced({
    id: "puebla-observes",
    eyebrow: "Today in Puebla",
    title: "Where It Is Most Observed",
    body:
      "Within Mexico, Cinco de Mayo is mainly observed in Puebla with parades, reenactments, and festive events.",
    interactionLabel: "Raise the banners",
    accent: "#0B7A53",
    visualCue: "Parade"
  }),
  sourced({
    id: "mexico-not-federal",
    eyebrow: "Modern Mexico",
    title: "Not a Federal Holiday",
    body:
      "For many Mexicans, May 5 is a regular day; offices, banks, and stores generally remain open.",
    interactionLabel: "Keep the plaza moving",
    accent: "#16213E",
    visualCue: "Open"
  }),
  sourced({
    id: "us-heritage",
    eyebrow: "United States",
    title: "Heritage Celebration",
    body:
      "In the United States, Cinco de Mayo is widely interpreted as a celebration of Mexican culture and heritage.",
    interactionLabel: "Fill the plaza with color",
    accent: "#E85D9E",
    visualCue: "Culture"
  }),
  sourced({
    id: "cinco-2026",
    eyebrow: "2026",
    title: "Cinco de Mayo 2026",
    body:
      "In 2026, Cinco de Mayo falls on Tuesday, May 5, giving this timeline a fresh reason to pulse.",
    interactionLabel: "Unlock the fiesta finale",
    accent: "#C83232",
    visualCue: "2026"
  })
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
    Math.max(
      state.factsUnlocked,
      Math.min(HISTORY_CARDS.length, state.totalPulses + 1)
    )
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
