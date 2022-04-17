import { Session as SessionView } from '@/modules/gittodoro/models/Session'
import { State } from '@/modules/gittodoro/models/State'
import { fromISO } from '@/modules/temporal/DateTime'

export class Session extends SessionView {
  static TIMER_DELAY = 2

  constructor(session: SessionView) {
    super(session)
  }

  get stateString() {
    return State[this.timer.state]
  }

  get endPlainDateTime() {
    if (this.end) {
      return fromISO(this.end.toISOString())
    }
  }
}
