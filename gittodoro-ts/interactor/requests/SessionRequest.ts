export type SessionRequest = {
  message: string
}

export type StartSessionRequest = SessionRequest & {
  start: Date
}

export type EndSessionRequest = SessionRequest & {
  end: Date
}