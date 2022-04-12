import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { StartSessionRequest } from '@/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionResponse } from '@/interactor/responses/SessionResponse'

export class StartSessionCommand implements SessionCommandInterface {
  sessionDataGateway: SessionDataGatewayInterface
  sessionPresenter: SessionPresenterInterface

  constructor(
    sessionDataGateway: SessionDataGatewayInterface,
    sessionPresenter: SessionPresenterInterface
  ) {
    this.sessionDataGateway = sessionDataGateway
    this.sessionPresenter = sessionPresenter
  }

  execute(request: StartSessionRequest): void {
    const session = this.sessionDataGateway.createSession(request.start)
    const sessionResponse: SessionResponse = {
      id: session.id,
      start: session.start,
    }
    this.sessionPresenter.present(sessionResponse)
  }
}
