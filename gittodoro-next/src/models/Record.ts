import { DateTimeType, now } from '@/modules/temporal/DateTime'
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
