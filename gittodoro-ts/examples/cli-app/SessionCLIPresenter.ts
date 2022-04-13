import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface'
import { SessionResponse } from '@/interactor/responses/SessionResponse'

export interface CLIView {
  display(content: Session): void
}

export class Session {
  start: Date
  end?: Date
  pomodoro: number
  short: number
  long: number
  longInterval: number

  private oneLongCycleDuration?: number

  constructor(obj: {
    start: Date
    end?: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }) {
    this.start = obj.start
    this.end = obj.end
    this.pomodoro = obj.pomodoro
    this.short = obj.short
    this.long = obj.long
    this.longInterval = obj.longInterval
  }

  get elapsed(): number {
    const from = this.start.getTime() / 1000
    const to = (this.end ? this.end.getTime() : Date.now()) / 1000
    return Math.round(to - from)
  }

  getOneLongCycleDuration(): number {
    if (!this.oneLongCycleDuration) {
      this.oneLongCycleDuration =
        this.longInterval * this.pomodoro +
        (this.longInterval - 1) * this.short +
        this.long
    }
    return this.oneLongCycleDuration
  }

  get state(): string {
    return this.calcStateRemainingTime().state
  }

  get remainingTime(): number {
    return this.calcStateRemainingTime().remainingTime
  }

  calcStateRemainingTime(): { state: string; remainingTime: number } {
    const durationInLongCycle = this.elapsed % this.getOneLongCycleDuration()

    if (durationInLongCycle == 0 || durationInLongCycle < this.pomodoro) {
      return {
        state: 'pomodoro',
        remainingTime: this.pomodoro - durationInLongCycle,
      }
    }

    const pomodoroAndShortCycleDuration =
      this.getOneLongCycleDuration() - this.long

    if (durationInLongCycle >= pomodoroAndShortCycleDuration) {
      return {
        state: 'long',
        remainingTime:
          this.long - (durationInLongCycle - pomodoroAndShortCycleDuration),
      }
    } else {
      const elapsedShortTime =
        durationInLongCycle % (this.pomodoro + this.short)

      if (elapsedShortTime >= this.pomodoro) {
        return {
          state: 'short',
          remainingTime: this.short - (elapsedShortTime - this.pomodoro),
        }
      } else {
        return {
          state: 'pomodoro',
          remainingTime: this.pomodoro - elapsedShortTime,
        }
      }
    }
  }
}

export class SessionCLIPresenter implements SessionPresenterInterface {
  cliView: CLIView

  constructor(cliView: CLIView) {
    this.cliView = cliView
  }
  present(response: SessionResponse): void {
    this.cliView.display(new Session(response))
  }
}
