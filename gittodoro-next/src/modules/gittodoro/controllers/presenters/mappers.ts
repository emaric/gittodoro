import { SessionResponse } from '@emaric/gittodoro-ts/lib/interactor/responses/SessionResponse'
import { Session } from '@/modules/gittodoro/models/Session'
import { StateTimer as StateTimerResponse } from '@emaric/gittodoro-ts/lib/interactor/responses/SessionResponse'
import { StateTimer } from '@/modules/gittodoro/models/StateTimer'
import { State } from '@/modules/gittodoro/models/State'

export const mapTimerSequence = (
  timerSequence: StateTimerResponse[]
): StateTimer[] => {
  return timerSequence.map((timer) => ({
    state: (<any>State)[timer.state],
    duration: timer.duration,
  }))
}

export const mapSession = (sessionResponse: SessionResponse): Session => {
  const session = new Session({
    ...sessionResponse,
    id: sessionResponse.id.toString(),
    timerSequence: mapTimerSequence(sessionResponse.timerSequence),
  })

  return session
}
