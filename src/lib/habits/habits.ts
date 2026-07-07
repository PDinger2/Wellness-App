export type Habit = {
    title: string;
    time: string;
    id: number;
  }

export type HabitCompletion = {
    habitId: number;
    habitDate: string;
}

/* Record<> allows for storage
   similar to a dictionary datatype
   Example:
   {
   "2026-07-01": [1, 2]
   "2026-07-02": [3]
   }
*/
export type CompletionsByDate = Record<string, number[]>

export function isHabitDone(habitId: number, habitDate: string, completions: CompletionsByDate){
    return (completions[habitDate]?.includes(habitId) ?? false)
}