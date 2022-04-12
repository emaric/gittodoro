import { Session } from '@/interactor/entities/Session'
import { ViewSessionRequest } from '@/interactor/requests/SessionRequest'
import { ViewSessionDetailsCommand } from '@/interactor/use-cases/ViewSessionDetailsCommand'
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage'
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter'

describe('[ViewSessionDetails] unit tests', () => {
  describe('when trying to execute View Session Details command', () => {
    it('should should return a session with the same start date', () => {
      const sampleSession: Session = {
        id: 0,
        start: new Date('2022-04-12T09:00:00'),
        pomodoro: 0,
        short: 0,
        long: 0,
        longInterval: 0,
      }

      const dataGateway = new SessionInMemoryStorage([sampleSession])
      const sessionPresenter = new SessionStringOutputPresenter(
        'View Session Details: '
      )
      const viewSessionDetailsCommand = new ViewSessionDetailsCommand(
        dataGateway,
        sessionPresenter
      )

      const request: ViewSessionRequest = {
        start: new Date('2022-04-12T09:00:00'),
        message: 'View session details',
      }

      viewSessionDetailsCommand.execute(request)

      const expectedOutput =
        'View Session Details: ' + JSON.stringify(sampleSession)
      expect(sessionPresenter.output).toBe(expectedOutput)
    })
  })
})
