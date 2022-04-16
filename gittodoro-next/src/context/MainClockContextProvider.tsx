import { createContext, useContext, useState, useEffect } from "react"

import { Clock } from "@/models/Clock"
import * as DateTime from "@/modules/temporal/DateTime"


type MainClockContext = {
  mainClock?: Clock
}

const MainClockContext = createContext<MainClockContext | undefined>(undefined)

const createClock = () => {
  const start = DateTime.now().with({
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  })
  const end = start.add({ minutes: 2 })
  console.log("MainClock", start.toString(), end.toString())
  const testClock = new Clock(start, end)
  // return new Clock()
  return testClock;
}

export const MainClockProvider = (props: { children: JSX.Element }) => {
  const [mainClock, setMainClock] = useState<Clock | undefined>(undefined)

  useEffect(() => {
    if (mainClock) {
      const remainingTime = mainClock.remaining * 1000
      if (remainingTime > 0) {
        const timeout = setTimeout(() => {
          setMainClock(createClock())
        }, remainingTime)
        return () => clearTimeout(timeout)
      }
    } else {
      setMainClock(createClock())
    }
  }, [mainClock])

  return (
    <MainClockContext.Provider value={{ mainClock }}>
      {props.children}
    </MainClockContext.Provider>
  )
}

export const useMainClock = () => {
  const context = useContext(MainClockContext)

  if (!context) {
    throw new Error("useMainClock must be used inside a `MainClockProvider`")
  }

  return context
}
