import { CLIView, Session } from './SessionCLIPresenter'

export class CLI implements CLIView {
  timeoutTimer?: NodeJS.Timeout
  intervalTimer?: NodeJS.Timer

  displayStart(session: Session) {
    if (session.end) {
      throw new Error('This session has ended.')
    }
    console.log('Starting a session...', session)
  }

  displayRunningSession(session: Session) {
    const { state, remainingTime } = session.calcStateRemainingTime()

    console.log(state + ' : ' + remainingTime)

    this.timeoutTimer = setTimeout(() => {
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer)
        console.log(state + ' : ' + 0)
      }
      this.displayRunningSession(session)
    }, remainingTime * 1000)

    this.intervalTimer && clearInterval(this.intervalTimer)
    let countDown = remainingTime
    this.intervalTimer = setInterval(() => {
      console.log(state + ' : ' + --countDown)
    }, 1000)
  }

  displayStoppedSession(session: Session) {
    if (session.end) {
      console.log('Stoping a session...', session)
      this.timeoutTimer && clearTimeout(this.timeoutTimer)
      this.intervalTimer && clearInterval(this.intervalTimer)
      console.log('Session has ended.')
    } else {
      throw new Error('The session should have an end date.')
    }
  }

  display(session: Session): void {
    if (session.end) {
      this.displayStoppedSession(session)
    } else {
      this.displayStart(session)
      this.displayRunningSession(session)
    }
  }
}
