import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import type { HistoryCard as HistoryCardType } from "../src/fiestaState";

type HistoryCardProps = {
  card: HistoryCardType;
  index: number;
  sourcePrefix: string;
  total: number;
  onInteract: () => void;
};

export function HistoryCard({
  card,
  index,
  sourcePrefix,
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
        <View style={[styles.visualBadge, { backgroundColor: card.accent }]}>
          <Text style={styles.visualText}>{card.visualCue}</Text>
        </View>
        <Text style={styles.count}>
          {index + 1}/{total}
        </Text>
      </View>
      <Text style={[styles.eyebrow, { color: card.accent }]}>
        {card.eyebrow}
      </Text>
      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.body}>{card.body}</Text>
      <View style={styles.footer}>
        <Text style={[styles.interaction, { color: card.accent }]}>
          {card.interactionLabel}
        </Text>
        <Pressable
          accessibilityRole="link"
          onPress={() => Linking.openURL(card.sourceUrl)}
        >
          <Text style={styles.source}>
            {sourcePrefix}: {card.sourceLabel}
          </Text>
        </Pressable>
      </View>
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
    gap: 7,
    minHeight: 220,
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
    flex: 1
  },
  footer: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
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
  source: {
    color: "#68717D",
    fontSize: 11,
    fontWeight: "800"
  },
  title: {
    color: "#16213E",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 29
  },
  visualBadge: {
    alignItems: "center",
    borderRadius: 8,
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  visualText: {
    color: "#FFF7E8",
    fontSize: 16,
    fontWeight: "900"
  }
});
