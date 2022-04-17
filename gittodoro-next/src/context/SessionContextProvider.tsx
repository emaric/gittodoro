import { FC, ReactNode, createContext, useContext, useState, useMemo, useCallback } from "react"

import { SessionController } from "@/modules/gittodoro/controllers/SessionController"
import { SessionView } from "@/modules/gittodoro/views/SessionView"
import { Session as ModuleSession } from "@/modules/gittodoro/models/Session"

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

  const sessionView = useMemo(() => {
    return new SessionView((moduleSession: ModuleSession) => {
      setSession(new Session(moduleSession))
    })
  }, [setSession])

  const sessionController = useMemo(() => {
    if (sessionView) {
      return new SessionController(sessionView)
    }
  }, [sessionView])

  const start = useCallback(() => {
    const now = new Date()

    const defaultDuration = {
      pomodoro: 20 * 60,
      short: 5 * 60,
      long: 15 * 60,
      longInterval: 4
    }

    sessionController?.start(defaultDuration, now)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionController])

  const stop = useCallback(() => {
    const now = new Date()
    sessionController?.stop(now)
  }, [sessionController])

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