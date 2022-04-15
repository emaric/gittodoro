import { SessionDataGatewayInterface } from '@emaric/gittodoro-ts/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionController as MainSessionController } from '@emaric/gittodoro-ts/controller/SessionController'
import {
  StartSessionRequest,
  EndSessionRequest,
} from '@emaric/gittodoro-ts/interactor/requests/SessionRequest'
import { SessionPresenterInterface } from '@emaric/gittodoro-ts/interactor/responses/SessionPresenterInterface'
import { StartSessionCommand } from '@emaric/gittodoro-ts/interactor/use-cases/StartSessionCommand'
import { EndSessionCommand } from '@emaric/gittodoro-ts/interactor/use-cases/EndSessionCommand'

import { LocalStorageDataGateway } from '../db/local'
import { SessionPresenter, SessionViewInterface } from './presenters/sessions'
import { Duration } from '../models/Duration'

export class SessionController {
  private storage: SessionDataGatewayInterface
  private presenter: SessionPresenterInterface
  private mainController: MainSessionController

  private startCommand: StartSessionCommand
  private endCommand: EndSessionCommand

  constructor(sessionView: SessionViewInterface) {
    this.storage = new LocalStorageDataGateway()
    this.presenter = new SessionPresenter(sessionView)
    this.mainController = new MainSessionController()

    this.startCommand = new StartSessionCommand(this.storage, this.presenter)
    this.endCommand = new EndSessionCommand(this.storage, this.presenter)
  }

  start(duration: Duration, start = new Date()) {
    const request: StartSessionRequest = {
      message: 'Start a new session.',
      start: start,
      ...duration,
    }
    this.mainController.startSession(this.startCommand, request)
  }

  stop(end = new Date()) {
    const request: EndSessionRequest = {
      message: 'Stop the last session',
      end,
    }
    this.mainController.endSession(this.endCommand, request)
  }
}
