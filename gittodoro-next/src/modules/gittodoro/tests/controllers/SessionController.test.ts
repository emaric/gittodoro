import { SessionController } from '@/modules/gittodoro/controllers/SessionController'
import { SessionViewInterface } from '@/modules/gittodoro/controllers/presenters/sessions'
import { Session } from '@/modules/gittodoro/models/Session'

import '../MockLocalStorage'

class TestSessionView implements SessionViewInterface {
  updateView(session: Session): void {
    console.log(JSON.stringify(session))
  }
}

describe('[SessionController] unit tests', () => {
  const sampleDuration = {
    pomodoro: 10,
    short: 2,
    long: 5,
    longInterval: 4,
  }
  const log = jest.fn()
  console.log = log

  const testView = new TestSessionView()
  const controller = new SessionController(testView)

  const expected = {
    id: '-1',
    start: new Date(),
    timerSequence: [
      { state: 0, duration: 10 },
      { state: 1, duration: 2 },
      { state: 0, duration: 10 },
      { state: 1, duration: 2 },
      { state: 0, duration: 10 },
      { state: 1, duration: 2 },
      { state: 0, duration: 10 },
      { state: 2, duration: 5 },
    ],
    circularLinkedTimerSequence: [
      { state: 0, duration: 10 },
      { state: 1, duration: 2 },
      { state: 0, duration: 10 },
      { state: 1, duration: 2 },
      { state: 0, duration: 10 },
      { state: 1, duration: 2 },
      { state: 0, duration: 10 },
      { state: 2, duration: 5 },
    ],
  }

  describe('when trying to start session', () => {
    it('should display started session details', () => {
      controller.start(sampleDuration, expected.start)
      expect(log.mock.calls.at(-1).at(-1)).toBe(JSON.stringify(expected))
    })
  })

  describe('when trying to end session', () => {
    it('shoudl display stopped session details', () => {
      const end = new Date()
      controller.stop(end)
      const expectedString = JSON.stringify(new Session({ ...expected, end }))
      expect(log.mock.calls.at(-1).at(-1)).toBe(expectedString)
    })
  })
})
