import { Session as SessionView } from '@/modules/gittodoro/models/Session'
import { State } from '@/modules/gittodoro/models/State'

export class Session extends SessionView {
  static TIMER_DELAY = 2

  constructor(session: SessionView) {
    super(session)
  }
  get stateString() {
    return State[this.timer.state]
  }
}
