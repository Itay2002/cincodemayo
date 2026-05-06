import { Pressable, StyleSheet, Text, View } from "react-native";
import type { HistoryCard as HistoryCardType } from "../src/fiestaState";

type HistoryCardProps = {
  card: HistoryCardType;
  index: number;
  total: number;
  onInteract: () => void;
};

export function HistoryCard({
  card,
  index,
  total,
  onInteract
}: HistoryCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${card.title}. ${card.interactionLabel}`}
      onPress={onInteract}
      style={({ pressed }) => [
        styles.card,
        { borderTopColor: card.accent },
        pressed && styles.pressed
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.eyebrow, { color: card.accent }]}>
          {card.eyebrow}
        </Text>
        <Text style={styles.count}>
          {index + 1}/{total}
        </Text>
      </View>
      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.body}>{card.body}</Text>
      <Text style={[styles.interaction, { color: card.accent }]}>
        {card.interactionLabel}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    color: "#26313F",
    fontSize: 15,
    lineHeight: 21
  },
  card: {
    backgroundColor: "rgba(255, 247, 232, 0.96)",
    borderRadius: 8,
    borderTopWidth: 5,
    gap: 8,
    minHeight: 190,
    padding: 18
  },
  count: {
    color: "#5F6873",
    fontSize: 12,
    fontWeight: "800"
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  interaction: {
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }]
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: "#16213E",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 29
  }
});
