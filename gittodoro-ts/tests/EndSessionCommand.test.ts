import { Session } from "@/interactor/entities/Session";
import { SessionDataGatewayInterface } from "@/interactor/data-gateways/SessionDataGatewayInterface";
import { EndSessionRequest } from "@/interactor/requests/SessionRequest";
import { SessionResponse } from "@/interactor/responses/SessionResponse";
import { SessionPresenterInterface } from "@/interactor/responses/SessionPresenterInterface";
import { EndSessionCommand } from "@/interactor/use-cases/EndSessionCommand";

class TestSessionDataGateway implements SessionDataGatewayInterface {
  storage: Session[]

  constructor(storage: Session[]) {
    this.storage = storage
  }
  
  createSession(start: Date): Session {
    throw new Error("Method not implemented.");
  }

  endSession(end: Date): Session {
    const last = this.storage.length - 1;
    this.storage[last].end = end
    return this.storage[last]
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

describe('[EndSessionCommand] unit tests', () => {
  describe('when trying to execute the end session command', () => {
    it('should end the latest unfinished session', () => {
      const unfinishedSession: Session = {
        id: 0,
        start: new Date('2022-04-12T09:00:00') 
      }
      const dataGateway = new TestSessionDataGateway([unfinishedSession])
      const presenter = new TestSessionPresenter('A session has ended: ')
      const endSessionCommand = new EndSessionCommand(dataGateway, presenter)
      const request: EndSessionRequest = {
        end: new Date('2022-04-12T00:00:00'),
        message: 'End my latest unfinished session.'
      }
      endSessionCommand.execute(request)

      const expectedOutput = 'A session has ended: ' + JSON.stringify(dataGateway.storage[0])

      expect(presenter.output).toBe(expectedOutput)
    });
  });
  
});