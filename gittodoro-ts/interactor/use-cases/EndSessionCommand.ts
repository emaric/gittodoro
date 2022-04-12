import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { EndSessionRequest } from '@/interactor/requests/SessionRequest'
import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import { SessionResponse } from '@/interactor/responses/SessionResponse'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'

export class EndSessionCommand implements SessionCommandInterface {
  sessionDataGateway: SessionDataGatewayInterface
  sessionPresenter: SessionPresenterInterface

  constructor(
    sessionDataGateway: SessionDataGatewayInterface,
    sessionPresenter: SessionPresenterInterface
  ) {
    this.sessionDataGateway = sessionDataGateway
    this.sessionPresenter = sessionPresenter
  }

  execute(request: EndSessionRequest): void {
    const session = this.sessionDataGateway.endSession(request.end)
    const sessionResponse: SessionResponse = {
      ...session,
    }
    this.sessionPresenter.present(sessionResponse)
  }
}
