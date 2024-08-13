export interface Workout {
  id: string,
  distance: number,
  calories: number,
  duration: number,
  heart_rate: number,
  start_time: string,
  date: Date,
  formatted_duration: string | null,
  type: "run" | "ride",
}
