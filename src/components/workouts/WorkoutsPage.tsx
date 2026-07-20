import { ScreenPlaceholder } from "@/components/screen-placeholder";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect, useContext } from "react"
import { View, ScrollView } from "react-native";
import { userContext } from "../context/userContext";
import getWorkouts from "@/lib/supabaseFunctions";
import { ThemedView } from "../themed-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutCard } from "./WorkoutCard";
import { styles } from "@/constants/styles";
import { VStack } from "../ui/vstack";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { ScreenView } from "../ui/ScreenView";

export default function WorkoutsPage() {
    const { user } = useContext(userContext)
    const [ workoutList, setWorkoutList ] = useState([])

    useEffect(() => {
        getWorkouts().then((data) => {
            setWorkoutList(data)
        }).catch((error) => console.log("Error on workouts page: ", error))
    }, [user])
    return (
        <>
        {/* TODO: 
            1. add workout display cards
            2. add ability to filter workouts 
            3. add ability to add workout to "completed" list
            4. add "settings" modal before starting workout
            */}
            <ScreenView>
                {workoutList.map((workout) => ( 
                    <WorkoutCard
                        key={workout.id}
                        title={workout.name}
                        time={workout.duration_min}
                        difficulty={workout.difficulty}
                        targetAreas={workout.target}
                    />
                ))}
            </ScreenView>
        </>

    )
}