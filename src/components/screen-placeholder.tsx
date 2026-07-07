import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export type ScreenPlaceholderProps = {
  title: string;
  description: string;
  /** Per-feature accent from the theme, e.g. theme.accentWorkouts */
  accentColor?: string;
};

/**
 * Temporary stand-in for a tab screen. Replace the contents of your feature's
 * route file with the real screen; keep the route file name the same so the
 * TABS config in app-tabs.tsx keeps pointing at it.
 */
export function ScreenPlaceholder({ title, description, accentColor }: ScreenPlaceholderProps) {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {accentColor && <View style={[styles.accentMark, { backgroundColor: accentColor }]} />}
        <ThemedText type="subtitle" style={styles.centerText}>
          {title}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          {description}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  accentMark: {
    width: Spacing.five,
    height: Spacing.one,
    borderRadius: Spacing.half,
    marginBottom: Spacing.two,
  },
  centerText: {
    textAlign: "center",
  },
});
