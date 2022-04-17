import { DateTimeType, difference, now } from '@/modules/temporal/DateTime'
import { Clock } from './Clock'
import { Session } from './Session'

export type Record = {
  state: string
  start: DateTimeType
  end: DateTimeType
}

export const createRecord = (session: Session): Record => {
  return {
    state: session.stateString,
    start: now(),
    end: now().add({ seconds: session.timer.duration + Session.TIMER_DELAY }),
  }
}

export const filterRecords = (clock: Clock, records: Record[]) => {
  return records
    .filter((record) => difference(record.end, clock.start) > 0)
    .filter((record) => difference(clock.end, record.start) > 0)
}
