import { createContext, useContext, useEffect, useState } from "react"
import { SessionController } from "../modules/gittodoro/controllers/SessionController"
import { SessionView } from "../modules/gittodoro/views/SessionView"

const SessionContext = createContext({})

export const SessionProvider = (props: { children: JSX.Element }) => {
  const [session, setSession] = useState(undefined)

  const sessionView = new SessionView(setSession)
  const sessionController = new SessionController(sessionView)

  return (
    <SessionContext.Provider value={{ session, sessionController }}>
      {props.children}
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