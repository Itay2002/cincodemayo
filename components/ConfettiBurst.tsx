import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export type ConfettiParticle = {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
};

type ConfettiBurstProps = {
  particles: ConfettiParticle[];
};

export function ConfettiBurst({ particles }: ConfettiBurstProps) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {particles.map((particle) => (
        <Particle key={particle.id} particle={particle} />
      ))}
    </View>
  );
}

function Particle({ particle }: { particle: ConfettiParticle }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      duration: 760,
      toValue: 1,
      useNativeDriver: true
    }).start();
  }, [progress]);

  const distance = 58 + (particle.id % 5) * 12;
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.cos(particle.angle) * distance]
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.sin(particle.angle) * distance + 34]
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.72, 1],
    outputRange: [1, 1, 0]
  });
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.2]
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          backgroundColor: particle.color,
          left: particle.x,
          opacity,
          top: particle.y,
          transform: [{ translateX }, { translateY }, { scale }]
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  particle: {
    borderRadius: 3,
    height: 10,
    position: "absolute",
    width: 10
  }
});
