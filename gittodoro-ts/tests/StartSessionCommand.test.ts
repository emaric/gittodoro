import { Session } from '@/interactor/entities/Session'
import { SessionDataGatewayInterface } from '@/interactor/data-gateways/SessionDataGatewayInterface'
import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionResponse } from '@/interactor/responses/SessionResponse'
import { StartSessionCommand } from '@/interactor/use-cases/StartSessionCommand'
import { StartSessionRequest } from '@/interactor/requests/SessionRequest'

class TestSessionDataGateway implements SessionDataGatewayInterface {
  storage: Session[]

  constructor(storage: Session[]) {
    this.storage = storage
  }

  createSession(start: Date): Session {
    const session: Session = {
      id: this.storage.length,
      start: start,
    }

    this.storage.push(session)

    return session
  }

  endSession(end: Date): Session {
    throw new Error('Method not implemented.')
  }
}

class TestSessionPresenter implements SessionPresenterInterface {
  output: string

  constructor(output: string) {
    this.output = output
  }

  present(session: SessionResponse): void {
    this.output = this.output + JSON.stringify(session)
  }
}

describe('[StartSessionCommand] unit tests', () => {
  describe('when trying to execute the start session command', () => {
    it('should create an incomplete session', () => {
      const dataGateway = new TestSessionDataGateway([])
      const presenter = new TestSessionPresenter('A session has started: ')
      const startSessionCommand = new StartSessionCommand(
        dataGateway,
        presenter
      )
      const request: StartSessionRequest = {
        start: new Date('2022-04-12T00:00:00'),
        message: 'This is my first session.',
      }
      startSessionCommand.execute(request)

      const expectedOutput =
        'A session has started: ' + JSON.stringify(dataGateway.storage[0])

      expect(presenter.output).toBe(expectedOutput)
    })
  })
})
