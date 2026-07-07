import { HStack } from "@/components/ui/hstack";
import { styles } from "@/constants/styles";
import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { WeekStrip } from "./WeekStrip";

export default function HabitsScreen() {
  const [ habitsComplete, setHabitsComplete ] = useState(0)
  const [ habitNumber, setHabitNumber ] = useState(0)
  useEffect(() => {
    setHabitNumber(3)
  }, [])
    return (
        <>
          <SafeAreaView style={styles.safeArea}>
                <HStack style={styles.headerRow}>
                    <Text variant="headlineLarge">Habits</Text>
                    <Text variant="titleMedium">{habitsComplete}/{habitNumber} complete</Text>
                </HStack>
                <VStack style={styles.columnContainer}>
                  <WeekStrip/>
                </VStack>
            </SafeAreaView>
        </>
    )
}
