import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionResponse } from '@/interactor/responses/SessionResponse'
import { mapSession } from '@/examples/cli-app/response-view-mapper'
import { Session } from '@/examples/cli-app/models/Session'

export interface CLIView {
  display(content: Session): void
}

export class SessionCLIPresenter implements SessionPresenterInterface {
  cliView: CLIView

  constructor(cliView: CLIView) {
    this.cliView = cliView
  }
  present(response: SessionResponse): void {
    this.cliView.display(mapSession(response))
  }
}