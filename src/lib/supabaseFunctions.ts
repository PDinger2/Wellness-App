import { supabase } from "./supabaseClient";

export async function getWorkouts() {
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

export async function getCompletedWorkouts(user){
    const {data, error} = await supabase
        .from("workout_sessions")
        .select(`
            id,
            duration_min,
            workouts (*)
        `)
        .eq("user_id", user.id)
    if (error) console.log("Error fetching completed workouts: ", error)
    return data
}