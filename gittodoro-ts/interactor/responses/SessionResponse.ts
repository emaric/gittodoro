export type SessionResponse = {
  id: number
  start: Date
  end?: Date
  pomodoro: number
  short: number
  long: number
  longInterval: number
}
