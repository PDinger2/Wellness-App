import { HStack } from "@/components/ui/hstack";
import { styles } from "@/constants/styles";
import { useEffect, useState } from "react";
import { Divider, Text, AnimatedFAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { WeekStrip } from "./WeekStrip";
import { View } from "react-native";
import { HabitAnimatedFAB } from "./HabitAnimatedFAB";
import { HabitCard } from "./HabitCard";

type Habit = {
  title: string;
  time: string;
  isDone: boolean;
}

export default function HabitsScreen() {
  const [ habitsComplete, setHabitsComplete ] = useState(0)
  const [ habitNumber, setHabitNumber ] = useState(0)
  const [ selectedDate, setSelectedDate ] = useState("")
  const [ fabExtended, setFabExtended ] = useState(true);
  const [ habitArray, setHabitArray ] = useState<Habit[]>([])


  const onScroll = ({ nativeEvent }) => {
    const currentPos = Math.floor(nativeEvent?.contentOffset?.y) ?? 0
    setFabExtended(currentPos <= 0)
  }
  useEffect(() => {
    setHabitArray([
      { title: "Stretch", time: "9:30 am", isDone: false},
      { title: "Meditate", time: "12:00 pm", isDone: false},
      { title: "Read for 30 minutes", time: "6:00 pm", isDone: false}
    ])

    setHabitNumber(habitArray.length)
  }, [])
    return (
        <>
          <SafeAreaView style={styles.safeArea}>
            <View />
                <HStack style={styles.rowBox}>
                    <Text variant="headlineLarge">Habits</Text>
                    <Text variant="titleMedium">{habitsComplete}/{habitNumber} complete</Text>
                </HStack>
                <VStack style={styles.columnContainer} space="md">
                  <WeekStrip/>
                  <Divider bold style={{ width: "100%" }}/>
                  {habitArray.map((habit, index) => (
                    <HabitCard
                      key={index}
                      title={habit.title}
                      time={habit.time}
                      isDone={habit.isDone}
                    />
                  ))}
                </VStack>
            </SafeAreaView>

            <HabitAnimatedFAB
              extended={fabExtended}
              onPress={() => console.log("FAB pressed")}
            />
        </>
    )
}
