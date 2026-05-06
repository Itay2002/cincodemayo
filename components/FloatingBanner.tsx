import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const COLORS = ["#0B7A53", "#FFF7E8", "#C83232", "#F2B84B", "#E85D9E"];

export function FloatingBanner() {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          duration: 3600,
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.timing(drift, {
          duration: 3600,
          toValue: 0,
          useNativeDriver: true
        })
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [drift]);

  const translateY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10]
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      {Array.from({ length: 18 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.flag,
            { backgroundColor: COLORS[index % COLORS.length] },
            index % 2 === 0 && styles.shortFlag
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    opacity: 0.94,
    width: "100%"
  },
  flag: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    width: 22
  },
  shortFlag: {
    height: 30
  }
});
