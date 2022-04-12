import { Session } from '@/interactor/entities/Session'
import { EndSessionRequest } from '@/interactor/requests/SessionRequest'
import { EndSessionCommand } from '@/interactor/use-cases/EndSessionCommand'
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'
describe('[EndSessionCommand] unit tests', () => {
  describe('when trying to execute the end session command', () => {
    it('should end the latest unfinished session', () => {
      const unfinishedSession: Session = {
        id: 0,
        start: new Date('2022-04-12T09:00:00'),
        pomodoro: 25,
        short: 5,
        long: 15,
        longInterval: 4,
      }
      const dataGateway = new SessionInMemoryStorage([unfinishedSession])
      const presenter = new SessionStringOutputPresenter(
        'A session has ended: '
      )
      const endSessionCommand = new EndSessionCommand(dataGateway, presenter)
      const request: EndSessionRequest = {
        end: new Date('2022-04-12T00:00:00'),
        message: 'End my latest unfinished session.',
      }
      endSessionCommand.execute(request)

      const expectedOutput =
        'A session has ended: ' + JSON.stringify(dataGateway.storage[0])

      expect(presenter.output).toBe(expectedOutput)
    })
  })
})
