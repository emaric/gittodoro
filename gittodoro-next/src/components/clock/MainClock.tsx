import { useState, MouseEvent, FC, useEffect, useCallback } from 'react'

import { useMainClock } from '@/context/MainClockContextProvider'
import { useSession } from '@/context/SessionContextProvider'
import { Session } from '@/models/Session'
import { Record, createRecord, filterRecords } from '@/models/Record'

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

  const handleClick = useCallback(async (event: MouseEvent<SVGCircleElement>) => {
    if (!session || session?.end) {
      await Promise.resolve(start())
    } else {
      await Promise.resolve(stop())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, stop])

  const updateCountdownTimer = useCallback(() => {
    setCountdown(false)
    if (!session || session?.end) {
      setState("")
      setRemainingTime(defaultPomodoro)
    } else {
      setState(session.stateString)
      setRemainingTime(session.timer.duration)
      setCountdown(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const updateRecord = useCallback(() => {
    if (session && !session.end) {
      setRecord(createRecord(session))
    } else {
      if (record && session?.endPlainDateTime) {
        record.end = session.endPlainDateTime
      }
      setRecord(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    updateCountdownTimer()
    if (record && session) {
      setRecords(records.concat(record))
      const ms = (session.timer.duration + Session.TIMER_DELAY) * 1000
      const timeout = setTimeout(() => {
        if (!session.end) {
          session.switchTimer()
          setRecord(createRecord(session))
        }
      }, ms)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record])

  useEffect(() => {
    updateRecord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    if (mainClock) {
      setRecords(filterRecords(mainClock, records))
    } else {
      setRecords([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainClock])

  return (
    <>
      <ClockBase>
        {mainClock && <ClockSecondsRing clock={mainClock} />}
        {mainClock && <ClockRecordsRing clock={mainClock} records={records} />}
        {mainClock && <ClockActiveRing clock={mainClock} record={record} />}
        <ClockButton onClick={handleClick}>
          <ClockCountdownTimer initialDuration={remainingTime} state={state} running={countdown} />
        </ClockButton>
      </ClockBase>
    </>
  )
}