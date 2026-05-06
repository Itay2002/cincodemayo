import { describe, expect, it } from "vitest";
import {
  APP_TITLE,
  HISTORY_CARDS,
  SPANISH_APP_TITLE,
  SPANISH_HISTORY_CARDS,
  createInitialFiestaState,
  getVisibleHistoryCards,
  recordFiestaPulse
} from "./fiestaState";

describe("fiesta pulse state", () => {
  it("increments pulses and unlocks the first history fact", () => {
    const next = recordFiestaPulse(createInitialFiestaState(), 1000);

    expect(next.totalPulses).toBe(1);
    expect(next.factsUnlocked).toBe(1);
    expect(getVisibleHistoryCards(next)).toHaveLength(1);
  });

  it("unlocks no more facts than exist", () => {
    let state = createInitialFiestaState();

    for (let index = 0; index < HISTORY_CARDS.length + 5; index += 1) {
      state = recordFiestaPulse(state, index * 1000);
    }

    expect(state.factsUnlocked).toBe(HISTORY_CARDS.length);
    expect(getVisibleHistoryCards(state)).toHaveLength(HISTORY_CARDS.length);
  });

  it("tracks tap combos when pulses are close together", () => {
    let state = createInitialFiestaState();

    state = recordFiestaPulse(state, 1000);
    state = recordFiestaPulse(state, 1250);
    state = recordFiestaPulse(state, 1450);
    state = recordFiestaPulse(state, 3000);

    expect(state.currentCombo).toBe(1);
    expect(state.biggestCombo).toBe(3);
  });

  it("includes 26 sourced history cards in chronological order", () => {
    expect(APP_TITLE).toBe("2026 5 De Mayo Fiesta");
    expect(HISTORY_CARDS).toHaveLength(26);
    expect(HISTORY_CARDS.every((card) => card.sourceLabel === "History.com")).toBe(
      true
    );
    expect(HISTORY_CARDS.every((card) => card.sourceUrl.includes("history.com"))).toBe(
      true
    );

    const allCopy = HISTORY_CARDS.map((card) =>
      [card.eyebrow, card.title, card.body].join(" ")
    ).join(" ");

    expect(HISTORY_CARDS.map((card) => card.id)).toEqual([
      "independence-1810",
      "independence-day",
      "juarez-elected",
      "debt-default",
      "european-response",
      "britain-spain-withdraw",
      "french-empire-plan",
      "veracruz-landing",
      "juarez-retreat",
      "lorencez-marches",
      "juarez-rallies-force",
      "mexican-ranks",
      "zaragoza-fortifies",
      "may-5-assault",
      "battle-duration",
      "french-retreat",
      "mexican-losses",
      "symbolic-victory",
      "maximilian-installed",
      "france-withdraws",
      "maximilian-executed",
      "puebla-renamed",
      "puebla-observes",
      "mexico-not-federal",
      "us-heritage",
      "cinco-2026"
    ]);

    expect(allCopy).toContain("Zaragoza");
    expect(allCopy).toContain("Puebla");
    expect(allCopy).toContain("Juarez");
    expect(allCopy).toContain("September 16");
    expect(allCopy).toContain("2026");
    expect(allCopy).toContain("164th anniversary");
  });

  it("includes matching Spanish history cards for Spanish mode", () => {
    expect(SPANISH_APP_TITLE).toBe("Fiesta 5 de Mayo 2026");
    expect(SPANISH_HISTORY_CARDS).toHaveLength(HISTORY_CARDS.length);
    expect(SPANISH_HISTORY_CARDS.map((card) => card.id)).toEqual(
      HISTORY_CARDS.map((card) => card.id)
    );

    const spanishCopy = SPANISH_HISTORY_CARDS.map((card) =>
      [card.eyebrow, card.title, card.body, card.interactionLabel].join(" ")
    ).join(" ");

    expect(spanishCopy).toContain("Juárez");
    expect(spanishCopy).toContain("5 de mayo");
    expect(spanishCopy).toContain("164.º aniversario");
    expect(spanishCopy).toContain("Tropas Francesas Llegan a Veracruz");
  });
});
