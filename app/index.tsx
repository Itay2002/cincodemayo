import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { CelebrationButton } from "../components/CelebrationButton";
import {
  ConfettiBurst,
  type ConfettiParticle
} from "../components/ConfettiBurst";
import { FloatingBanner } from "../components/FloatingBanner";
import { HistoryCard } from "../components/HistoryCard";
import { StatsStrip } from "../components/StatsStrip";
import {
  APP_TITLE,
  HISTORY_CARDS,
  createInitialFiestaState,
  getVisibleHistoryCards,
  nextTheme,
  recordFiestaPulse,
  type FiestaThemeId
} from "../src/fiestaState";

const CONFETTI_COLORS = [
  "#0B7A53",
  "#C83232",
  "#F2B84B",
  "#FFF7E8",
  "#E85D9E"
];

const THEMES: Record<
  FiestaThemeId,
  {
    label: string;
    sky: string;
    glow: string;
    ground: string;
    overlay: string;
  }
> = {
  day: {
    label: "Day Plaza",
    sky: "#65B8D4",
    glow: "#FFF7E8",
    ground: "#D98245",
    overlay: "rgba(255, 247, 232, 0.12)"
  },
  sunset: {
    label: "Puebla Sunset",
    sky: "#D9564A",
    glow: "#F2B84B",
    ground: "#9D4F36",
    overlay: "rgba(242, 184, 75, 0.18)"
  },
  night: {
    label: "Night Fiesta",
    sky: "#16213E",
    glow: "#E85D9E",
    ground: "#3B315A",
    overlay: "rgba(22, 33, 62, 0.2)"
  }
};

export default function FiestaPulseHistoryScreen() {
  const [fiestaState, setFiestaState] = useState(createInitialFiestaState);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const pulseScale = useRef(new Animated.Value(0)).current;
  const theme = THEMES[fiestaState.themeId];
  const visibleCards = getVisibleHistoryCards(fiestaState);
  const activeCard = visibleCards[activeCardIndex] ?? HISTORY_CARDS[0];

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    const rawStats = globalThis.localStorage?.getItem("fiestaPulseStats");

    if (!rawStats) {
      return;
    }

    try {
      const parsedStats = JSON.parse(rawStats) as {
        totalPulses?: number;
        factsUnlocked?: number;
        biggestCombo?: number;
      };

      setFiestaState((current) => ({
        ...current,
        totalPulses: parsedStats.totalPulses ?? current.totalPulses,
        factsUnlocked: parsedStats.factsUnlocked ?? current.factsUnlocked,
        biggestCombo: parsedStats.biggestCombo ?? current.biggestCombo
      }));
    } catch {
      globalThis.localStorage?.removeItem("fiestaPulseStats");
    }
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    globalThis.localStorage?.setItem(
      "fiestaPulseStats",
      JSON.stringify({
        biggestCombo: fiestaState.biggestCombo,
        factsUnlocked: fiestaState.factsUnlocked,
        totalPulses: fiestaState.totalPulses
      })
    );
  }, [
    fiestaState.biggestCombo,
    fiestaState.factsUnlocked,
    fiestaState.totalPulses
  ]);

  const pulseStyle = useMemo(
    () => ({
      opacity: pulseScale.interpolate({
        inputRange: [0, 0.45, 1],
        outputRange: [0, 0.58, 0]
      }),
      transform: [
        {
          scale: pulseScale.interpolate({
            inputRange: [0, 1],
            outputRange: [0.48, 2.8]
          })
        }
      ]
    }),
    [pulseScale]
  );

  const animatePulse = () => {
    pulseScale.setValue(0);
    Animated.timing(pulseScale, {
      duration: 720,
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const addConfetti = (x?: number, y?: number) => {
    const { width, height } = Dimensions.get("window");
    const originX = x ?? width / 2;
    const originY = y ?? height / 2;
    const createdAt = Date.now();
    const burst = Array.from({ length: 16 }).map((_, index) => ({
      angle: (Math.PI * 2 * index) / 16,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      id: createdAt + index,
      x: originX,
      y: originY
    }));

    setParticles((current) => [...current, ...burst].slice(-96));
    setTimeout(() => {
      setParticles((current) =>
        current.filter((particle) => particle.id < createdAt || particle.id >= createdAt + 16)
      );
    }, 820);
  };

  const recordPulse = (x?: number, y?: number) => {
    animatePulse();
    addConfetti(x, y);
    setFiestaState((current) => {
      const next = recordFiestaPulse(current, Date.now());
      setActiveCardIndex(Math.max(0, next.factsUnlocked - 1));
      return next;
    });
  };

  const handlePlazaPress = (event: {
    nativeEvent: { pageX?: number; pageY?: number; locationX?: number; locationY?: number };
  }) => {
    const { pageX, pageY, locationX, locationY } = event.nativeEvent;
    recordPulse(pageX ?? locationX, pageY ?? locationY);
  };

  const cycleCard = () => {
    if (visibleCards.length === 0) {
      recordPulse();
      return;
    }

    addConfetti();
    setActiveCardIndex((current) => (current + 1) % visibleCards.length);
  };

  return (
    <Pressable onPress={handlePlazaPress} style={styles.root}>
      <View style={[styles.sky, { backgroundColor: theme.sky }]}>
        <View style={[styles.sun, { backgroundColor: theme.glow }]} />
        <View style={[styles.overlay, { backgroundColor: theme.overlay }]} />
        <View style={styles.mountains}>
          <View style={[styles.mountain, styles.leftMountain]} />
          <View style={[styles.mountain, styles.rightMountain]} />
        </View>
        <View style={styles.plazaRow}>
          <Building color="#FFF7E8" roof="#C83232" />
          <Building color="#F2B84B" roof="#0B7A53" tall />
          <Building color="#F7DCA7" roof="#C83232" />
        </View>
        <View style={styles.archRow}>
          <View style={styles.arch} />
          <View style={styles.arch} />
          <View style={styles.arch} />
          <View style={styles.arch} />
        </View>
        <View style={styles.path} />
        <View style={[styles.ground, { backgroundColor: theme.ground }]} />
      </View>

      <ConfettiBurst particles={particles} />
      <Animated.View
        pointerEvents="none"
        style={[styles.pulseGlow, { backgroundColor: theme.glow }, pulseStyle]}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.bannerWrap}>
          <FloatingBanner />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.kicker}>Cinco de Mayo</Text>
            <Text style={styles.title}>{APP_TITLE}</Text>
          </View>

          <StatsStrip state={fiestaState} />

          <View style={styles.middle}>
            <CelebrationButton
              combo={fiestaState.currentCombo}
              onPress={() => recordPulse()}
            />
          </View>

          <View style={styles.bottomPanel}>
            <HistoryCard
              card={activeCard}
              index={activeCardIndex}
              onInteract={cycleCard}
              total={HISTORY_CARDS.length}
            />

            <View style={styles.controls}>
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  setFiestaState((current) => ({
                    ...current,
                    themeId: nextTheme(current.themeId)
                  }))
                }
                style={styles.themeButton}
              >
                <Text style={styles.themeButtonText}>{theme.label}</Text>
              </Pressable>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.dots}
              >
                {HISTORY_CARDS.map((card, index) => {
                  const unlocked = index < fiestaState.factsUnlocked;
                  const active = index === activeCardIndex;

                  return (
                    <Pressable
                      accessibilityRole="button"
                      disabled={!unlocked}
                      key={card.id}
                      onPress={() => setActiveCardIndex(index)}
                      style={[
                        styles.dot,
                        {
                          backgroundColor: unlocked ? card.accent : "#FFF7E8",
                          opacity: unlocked ? 1 : 0.42
                        },
                        active && styles.activeDot
                      ]}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

function Building({
  color,
  roof,
  tall
}: {
  color: string;
  roof: string;
  tall?: boolean;
}) {
  return (
    <View style={[styles.building, { backgroundColor: color }, tall && styles.tallBuilding]}>
      <View style={[styles.roof, { backgroundColor: roof }]} />
      <View style={styles.windows}>
        <View style={styles.window} />
        <View style={styles.window} />
        <View style={styles.window} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    borderColor: "#FFF7E8",
    borderWidth: 3,
    transform: [{ scale: 1.15 }]
  },
  bannerWrap: {
    paddingHorizontal: 10,
    paddingTop: 8
  },
  bottomPanel: {
    gap: 12
  },
  building: {
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 104,
    justifyContent: "flex-end",
    marginHorizontal: 4,
    paddingBottom: 14,
    width: 104
  },
  content: {
    flex: 1,
    gap: 16,
    justifyContent: "space-between",
    marginHorizontal: "auto",
    maxWidth: 520,
    padding: 16,
    width: "100%"
  },
  controls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between"
  },
  dot: {
    borderColor: "transparent",
    borderRadius: 999,
    height: 22,
    marginRight: 8,
    width: 22
  },
  dots: {
    flexGrow: 0,
    maxWidth: 190
  },
  ground: {
    bottom: 0,
    height: "24%",
    left: 0,
    opacity: 0.96,
    position: "absolute",
    right: 0
  },
  header: {
    gap: 2
  },
  arch: {
    backgroundColor: "rgba(255, 247, 232, 0.34)",
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    height: 74,
    width: 48
  },
  archRow: {
    bottom: "22%",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 2
  },
  kicker: {
    color: "#FFF7E8",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  leftMountain: {
    borderBottomColor: "rgba(11, 122, 83, 0.42)",
    borderLeftWidth: 150,
    borderRightWidth: 120
  },
  middle: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 188
  },
  mountain: {
    borderBottomWidth: 170,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    height: 0,
    width: 0
  },
  mountains: {
    alignItems: "flex-end",
    bottom: "20%",
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    opacity: 0.78,
    position: "absolute",
    right: 0
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  plazaRow: {
    alignItems: "flex-end",
    bottom: "18%",
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 1
  },
  pulseGlow: {
    borderRadius: 999,
    height: 220,
    left: "50%",
    marginLeft: -110,
    marginTop: -110,
    position: "absolute",
    top: "50%",
    width: 220
  },
  rightMountain: {
    borderBottomColor: "rgba(22, 33, 62, 0.34)",
    borderLeftWidth: 120,
    borderRightWidth: 150
  },
  roof: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 16,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  root: {
    backgroundColor: "#16213E",
    flex: 1,
    minHeight: "100%"
  },
  safeArea: {
    flex: 1
  },
  path: {
    backgroundColor: "rgba(255, 247, 232, 0.22)",
    borderTopLeftRadius: 72,
    borderTopRightRadius: 72,
    bottom: 0,
    height: "20%",
    left: "42%",
    position: "absolute",
    right: "42%",
    transform: [{ scaleX: 2.8 }],
    zIndex: 1
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden"
  },
  sun: {
    borderRadius: 999,
    height: 170,
    opacity: 0.9,
    position: "absolute",
    right: -26,
    top: 80,
    width: 170
  },
  tallBuilding: {
    height: 136,
    width: 116
  },
  themeButton: {
    backgroundColor: "rgba(255, 247, 232, 0.94)",
    borderColor: "rgba(22, 33, 62, 0.14)",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  themeButtonText: {
    color: "#16213E",
    fontSize: 13,
    fontWeight: "900"
  },
  title: {
    color: "#FFF7E8",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 38
  },
  window: {
    backgroundColor: "rgba(22, 33, 62, 0.32)",
    borderRadius: 3,
    height: 22,
    width: 16
  },
  windows: {
    flexDirection: "row",
    gap: 9
  }
});
