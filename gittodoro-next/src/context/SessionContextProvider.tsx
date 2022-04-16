import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react"

import { SessionController } from "@/modules/gittodoro/controllers/SessionController"
import { SessionView } from "@/modules/gittodoro/views/SessionView"

import { Session } from "@/models/Session"

type SessionContextType = {
  session?: Session,
  start: () => void,
  stop: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export const SessionProvider: FC<Props> = ({ children }) => {
  const [session, setSession] = useState<Session | undefined>(undefined)

  const sessionView = new SessionView((s: any) => {
    setSession(new Session(s))
  })
  const sessionController = new SessionController(sessionView)

  const defaultDuration = {
    pomodoro: 20,
    short: 5,
    long: 15,
    longInterval: 4
  }

  const start = () => {
    const now = new Date()
    sessionController.start(defaultDuration, now)
  }
  const stop = () => {
    const now = new Date()
    sessionController.stop(now)
  }

  return (
    <SessionContext.Provider value={{ session, start, stop }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error("useSession must be used inside a `SessionProvider`")
  }

  return context
}