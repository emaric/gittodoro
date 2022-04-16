import { useState, MouseEvent, FC, useEffect } from 'react'

import { useMainClock } from '@/context/MainClockContextProvider'
import { useSession } from '@/context/SessionContextProvider'

import ClockBase from "./ClockBase"
import ClockButton from "./ClockButton"
import ClockSecondsRing from "./ClockSecondsRing"
import ClockCountdownTimer from './ClockCountdownTimer'
import { Session } from '@/models/Session'

export const MainClock: FC = () => {
  const { mainClock } = useMainClock()
  const { session, start, stop } = useSession()

  const [state, setState] = useState<string>("")
  const [countdown, setCountdown] = useState(false)
  const [remainingTime, setRemainingTime] = useState(25 * 60)

  const handleClick = async (event: MouseEvent<SVGCircleElement>) => {
    if (!session || session?.end) {
      await Promise.resolve(start())
      setCountdown(true)
    } else {
      setCountdown(false)
      await Promise.resolve(stop())
    }
  }

  useEffect(() => {
    if (session) {
      const to = setTimeout(() => {
        setCountdown(false)
        setRemainingTime(session.switchTimer().duration)
        setState(session.stateString)
        setCountdown(true)
      }, (remainingTime + Session.TIMER_DELAY) * 1000)

      return () => clearTimeout(to)
    }
  }, [remainingTime, session])

  useEffect(() => {
    console.log(session)
    if (session) {
      if (session.end) {
        setCountdown(false)
        setState("")
        setRemainingTime(25 * 60)
      } else {
        setCountdown(false)
        setState(session.stateString)
        setRemainingTime(session.timer.duration)
        setCountdown(true)
      }
    }
  }, [session])

  return (
    <ClockBase>
      {mainClock && <ClockSecondsRing clock={mainClock} />}
      <ClockButton onClick={handleClick}>
        <ClockCountdownTimer initialDuration={remainingTime} state={state} running={countdown} />
      </ClockButton>
    </ClockBase>
  )
}