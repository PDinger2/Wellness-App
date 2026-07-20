import { supabase } from "./supabaseClient";

export default async function getWorkouts() {
    const {data, error} = await supabase
        .from("workouts")
        .select("*")
    if (error) console.log("Error fetching workouts from database: ", error)
    return data
}

export async function setWorkoutComplete(user, workout){
    const {data, error} = await supabase
        .from("workout_sessions")
        .insert({ user_id: user.id, workout_id: workout.id, duration_min: workout.duration_min })
    if (error) console.log("Error setting workout as complete: ", error)
}