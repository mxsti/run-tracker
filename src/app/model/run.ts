export interface Run {
  timestamp: FireBaseTimestamp,
  length: number,
  strava: string,
  date: Date,
}

interface FireBaseTimestamp {
  seconds: number,
  nanoseconds: number,
}
