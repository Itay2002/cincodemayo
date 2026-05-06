import { StyleSheet, Text, View } from "react-native";
import type { FiestaState } from "../src/fiestaState";

type StatsStripProps = {
  state: FiestaState;
  labels: {
    bestCombo: string;
    factsFound: string;
    fiestaPulses: string;
  };
};

export function StatsStrip({ labels, state }: StatsStripProps) {
  return (
    <View style={styles.container}>
      <Stat label={labels.fiestaPulses} value={state.totalPulses} />
      <View style={styles.divider} />
      <Stat label={labels.factsFound} value={state.factsUnlocked} />
      <View style={styles.divider} />
      <Stat label={labels.bestCombo} value={state.biggestCombo} />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 247, 232, 0.92)",
    borderColor: "rgba(22, 33, 62, 0.12)",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 68,
    paddingHorizontal: 12
  },
  divider: {
    backgroundColor: "rgba(22, 33, 62, 0.16)",
    height: 36,
    width: 1
  },
  label: {
    color: "#46515F",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase"
  },
  stat: {
    alignItems: "center",
    flex: 1,
    gap: 3
  },
  value: {
    color: "#16213E",
    fontSize: 24,
    fontWeight: "900"
  }
});
