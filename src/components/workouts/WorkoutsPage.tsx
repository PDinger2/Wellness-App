import { useState, useEffect, useContext } from "react"
import { userContext } from "../context/userContext";
import getWorkouts from "@/lib/supabaseFunctions";
import { WorkoutCard } from "./WorkoutCard";
import { ScreenView } from "../ui/ScreenView";
import { Chip } from "react-native-paper";
import { styles } from "@/constants/styles";
import { HStack } from "../ui/hstack";
import { WorkoutFilterChip } from "./WorkoutFilterChip";
import { getWorkoutsWithTag } from "@/lib/workouts";

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
            3. add ability to add workout to "completed" list
            4. add "settings" modal before starting workout
            */}
            <ScreenView
                header={
                    <>
                        <HStack style={[styles.headerStyle, {justifyContent: "space-between"}]}>
                            {workoutTags.map((tag) => 
                            <WorkoutFilterChip
                                key={tag}
                                tag={tag}
                                isSelected={selectedTag === tag}
                                onSelect={(tag) => setFilter(tag)}
                            />
                            )}
                        </HStack>
                    </>
                }
            >
                {filteredWorkouts.map((workout) => ( 
                    <WorkoutCard
                        key={workout.id}
                        title={workout.name}
                        time={workout.duration_min}
                        difficulty={workout.difficulty}
                        targetAreas={workout.target}
                        tags={workout.goal_tags}
                    />
                ))}
            </ScreenView>
        </>

    )
}