import { useState, MouseEvent, FC, useEffect, useCallback } from 'react'

import { useMainClock } from '@/context/MainClockContextProvider'
import { useSession } from '@/context/SessionContextProvider'
import { Session } from '@/models/Session'
import { Record, createRecord } from '@/models/Record'

import ClockBase from "./ClockBase"
import ClockButton from "./ClockButton"
import ClockSecondsRing from "./ClockSecondsRing"
import ClockCountdownTimer from './ClockCountdownTimer'
import ClockActiveRing from './ClockActiveRing'
import ClockRecordsRing from './ClockRecordsRing'

export const MainClock: FC = () => {
  const { mainClock } = useMainClock()
  const { session, start, stop } = useSession()

  const defaultPomodoro = 25 * 60

  const [state, setState] = useState<string>("")
  const [countdown, setCountdown] = useState(false)
  const [remainingTime, setRemainingTime] = useState(defaultPomodoro)

  const [record, setRecord] = useState<Record | undefined>(undefined)
  const [records, setRecords] = useState<Record[]>([])

  const handleClick = async (event: MouseEvent<SVGCircleElement>) => {
    if (!session || session?.end) {
      await Promise.resolve(start())
      setCountdown(true)
    } else {
      setCountdown(false)
      await Promise.resolve(stop())
    }
  }

  const updateRecords = useCallback(() => {
    if (record) {
      setRecords(records.concat(record))
    }
  }, [record, records])

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
        updateRecords()
      }, (remainingTime + Session.TIMER_DELAY) * 1000)

      return () => clearTimeout(to)
    }
  }, [remainingTime, session, updateCountdownTimer, updateRecord, updateRecords])

  useEffect(() => {
    updateCountdownTimer()
    updateRecord()
  }, [updateCountdownTimer, updateRecord])

  return (
    <ClockBase>
      {mainClock && <ClockSecondsRing clock={mainClock} />}
      {mainClock && <ClockRecordsRing clock={mainClock} records={records} />}
      {mainClock && <ClockActiveRing clock={mainClock} record={record} />}
      <ClockButton onClick={handleClick}>
        <ClockCountdownTimer initialDuration={remainingTime} state={state} running={countdown} />
      </ClockButton>
    </ClockBase>
  )
}