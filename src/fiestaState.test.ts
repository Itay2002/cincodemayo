import { describe, expect, it } from "vitest";
import {
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

    for (let index = 0; index < 20; index += 1) {
      state = recordFiestaPulse(state, index * 1000);
    }

    expect(state.factsUnlocked).toBe(5);
    expect(getVisibleHistoryCards(state)).toHaveLength(5);
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
});
