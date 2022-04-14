import { SessionCommandInterface } from '@/interactor/requests/SessionCommandInterface'
import {
  StartSessionRequest,
  ViewSessionRequest,
} from '@/interactor/requests/SessionRequest'

export class SessionController {
  startSession(
    interactor: SessionCommandInterface,
    request: StartSessionRequest
  ): void {
    interactor.execute(request)
  }

  endSession(
    interactor: SessionCommandInterface,
    request: StartSessionRequest
  ): void {
    interactor.execute(request)
  }

  viewSession(
    interactor: SessionCommandInterface,
    request: ViewSessionRequest
  ): void {
    interactor.execute(request)
  }
}