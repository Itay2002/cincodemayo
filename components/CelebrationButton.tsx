import { Pressable, StyleSheet, Text, View } from "react-native";

type CelebrationButtonProps = {
  combo: number;
  onPress: () => void;
};

export function CelebrationButton({ combo, onPress }: CelebrationButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Trigger a Fiesta Pulse"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.innerRing}>
        <Text style={styles.icon}>✦</Text>
        <Text style={styles.label}>Fiesta Pulse</Text>
        <Text style={styles.combo}>
          {combo > 1 ? `${combo} tap combo` : "Tap the plaza"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F2B84B",
    borderColor: "rgba(255, 247, 232, 0.86)",
    borderRadius: 999,
    borderWidth: 6,
    height: 172,
    justifyContent: "center",
    width: 172
  },
  combo: {
    color: "#FFF7E8",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 4,
    textTransform: "uppercase"
  },
  icon: {
    color: "#FFF7E8",
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 38
  },
  innerRing: {
    alignItems: "center",
    backgroundColor: "#C83232",
    borderRadius: 999,
    height: 132,
    justifyContent: "center",
    padding: 12,
    width: 132
  },
  label: {
    color: "#FFF7E8",
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center"
  },
  pressed: {
    transform: [{ scale: 0.96 }]
  }
});
