import { useState, useEffect, useContext } from "react"
import { userContext } from "../context/userContext";
import getWorkouts from "@/lib/supabaseFunctions";
import { WorkoutCard } from "./WorkoutCard";
import { ScreenView } from "../ui/ScreenView";
import { Chip, Divider } from "react-native-paper";
import { styles } from "@/constants/styles";
import { HStack } from "../ui/hstack";
import { WorkoutFilterChip } from "./WorkoutFilterChip";
import { getWorkoutsWithTag } from "@/lib/workouts";
import { ScrollView } from "react-native";
import { Spacing, TopBadgeInset } from "@/constants/theme";

export default function WorkoutsPage() {
    const { user } = useContext(userContext)
    const [ workoutList, setWorkoutList ] = useState([])
    const [ workoutTags, setWorkoutTags ] = useState([])
    const [ selectedTag, setSelectedTag ] = useState<String>("all")


    const setFilter = (tag) => {
        setSelectedTag(tag)
    }

    useEffect(() => {
        getWorkouts().then((data) => {
            setWorkoutList(data)
            let tags = [... new Set(data?.flatMap((workout) => workout.goal_tags ?? []))].sort()
            setWorkoutTags(tags)
        }).catch((error) => console.log("Error on workouts page: ", error))
    }, [user])

    const filteredWorkouts = getWorkoutsWithTag(workoutList, selectedTag)
    return (
        <>
        {/* TODO: 
            1. add workout display cards DONE
            2. add ability to filter workouts DONE
            3. add ability to add workout to "completed" WIP
            4. add ability to view completed workouts
            5. add "settings" modal before starting workout
            6. add workout timer
            7. Add calendar
            */}
            <ScreenView
                header={
                    <>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ flexGrow: 0, paddingTop: TopBadgeInset, paddingBottom: Spacing.two}}
                            contentContainerStyle={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                                paddingHorizontal: Spacing.four
                            }}
                        >
                            {workoutTags.map((tag) => 
                            <WorkoutFilterChip
                                key={tag}
                                tag={tag}
                                isSelected={selectedTag === tag}
                                onSelect={(tag) => setFilter(tag)}
                            />
                            )}
                        </ScrollView>
                        <Divider bold style={{width: "100%"}}></Divider>
                    </>
                }
            >
                {filteredWorkouts.map((workout) => ( 
                    <WorkoutCard
                        key={workout.id}
                        workout={workout}
                    />
                ))}
            </ScreenView>
        </>

    )
}