import { supabase } from "./supabaseClient";

export default async function getWorkouts() {
    const {data, error} = await supabase
        .from("workouts")
        .select("*")
    if (error) console.log("Error fetching workouts from database: ", error)
    return data
}