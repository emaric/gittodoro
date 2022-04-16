import { useState, MouseEvent, FC, useEffect, useCallback } from 'react'

import { useMainClock } from '@/context/MainClockContextProvider'
import { useSession } from '@/context/SessionContextProvider'
import { Session } from '@/models/Session'

import ClockBase from "./ClockBase"
import ClockButton from "./ClockButton"
import ClockSecondsRing from "./ClockSecondsRing"
import ClockCountdownTimer from './ClockCountdownTimer'
import ClockActiveRing from './ClockActiveRing'
import { Record, createRecord } from '@/models/Record'

export const MainClock: FC = () => {
  const { mainClock } = useMainClock()
  const { session, start, stop } = useSession()

  const defaultPomodoro = 25 * 60

  const [state, setState] = useState<string>("")
  const [countdown, setCountdown] = useState(false)
  const [remainingTime, setRemainingTime] = useState(defaultPomodoro)

  const [record, setRecord] = useState<Record | undefined>(undefined)

  const handleClick = async (event: MouseEvent<SVGCircleElement>) => {
    if (!session || session?.end) {
      await Promise.resolve(start())
      setCountdown(true)
    } else {
      setCountdown(false)
      await Promise.resolve(stop())
    }
  }

  const updateRecord = useCallback(() => {
    if (!session || session?.end) {
      setRecord(undefined)
    } else {
      setRecord(createRecord(session))
    }
  }, [session])

  const updateCountdownTimer = useCallback(() => {
    if (!session || session?.end) {
      setCountdown(false)
      setRemainingTime(defaultPomodoro)
      setState("")
    } else {
      setCountdown(false)
      setRemainingTime(session.timer.duration)
      setState(session.stateString)
      setCountdown(true)
    }
  }, [defaultPomodoro, session])

  useEffect(() => {
    if (session && !session.end) {
      const to = setTimeout(() => {
        session.switchTimer()
        updateCountdownTimer()
        updateRecord()
      }, (remainingTime + Session.TIMER_DELAY) * 1000)

      return () => clearTimeout(to)
    }
  }, [remainingTime, session, updateCountdownTimer, updateRecord])

  useEffect(() => {
    updateCountdownTimer()
    updateRecord()
  }, [updateCountdownTimer, updateRecord])

  return (
    <ClockBase>
      {mainClock && <ClockSecondsRing clock={mainClock} />}
      {mainClock && <ClockActiveRing clock={mainClock} record={record} />}
      <ClockButton onClick={handleClick}>
        <ClockCountdownTimer initialDuration={remainingTime} state={state} running={countdown} />
      </ClockButton>
    </ClockBase>
  )
}