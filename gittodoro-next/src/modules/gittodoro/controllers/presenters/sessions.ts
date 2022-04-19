import { Session } from '@/modules/gittodoro/models/Session'
import { SessionPresenterInterface } from '@emaric/gittodoro-ts/lib/interactor/responses/SessionPresenterInterface'
import { SessionResponse } from '@emaric/gittodoro-ts/lib/interactor/responses/SessionResponse'
import { mapSession } from './mappers'

export interface SessionViewInterface {
  updateView(session: Session): void
}

export class SessionPresenter implements SessionPresenterInterface {
  sessionView: SessionViewInterface

  constructor(sessionView: SessionViewInterface) {
    this.sessionView = sessionView
  }

  present(response: SessionResponse): void {
    this.sessionView.updateView(mapSession(response))
  }
}
