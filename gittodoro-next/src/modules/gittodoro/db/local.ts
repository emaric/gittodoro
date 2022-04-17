import { SessionDataGatewayInterface } from '@emaric/gittodoro-ts/lib/interactor/data-gateways/SessionDataGatewayInterface'
import { Session } from '@emaric/gittodoro-ts/lib/interactor/entities/Session'
import { Duration } from '@emaric/gittodoro-ts/lib/interactor/entities/Duration'

const mapToEntity = (sessionsString: string): Session[] => {
  const objs = JSON.parse(sessionsString)
  return objs.map(
    (obj: any) =>
      new Session({
        id: obj.id,
        start: new Date(obj.start),
        end: obj.end ? new Date(obj.end) : undefined,
        duration: new Duration({ ...obj.duration }),
      })
  )
}

const mapToString = (sessions: Session[]) => {
  return JSON.stringify(sessions)
}

export class LocalStorageDataGateway implements SessionDataGatewayInterface {
  static SESSIONS_ID = 'gittodoro-sessions'
  static DEFAULT_DURATION_ID = 'gittodoro-default-duration'

  private updateSessions(sessions: Session[]) {
    localStorage.setItem(
      LocalStorageDataGateway.SESSIONS_ID,
      mapToString(sessions)
    )
  }

  createSession(args: {
    start: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }): Session {
    const session = new Session({
      ...args,
      id: this.sessions.length,
      duration: new Duration({
        ...args,
        id: -1,
      }),
    })

    const sessions = this.sessions
    sessions.push(session)

    this.updateSessions(sessions)

    return session
  }

  readSession(start: Date): Session {
    const session = this.sessions.find(
      (session) => session.start.getTime() == start.getTime()
    )

    if (session) {
      return session
    }

    throw new Error('Session not found')
  }

  endSession(end: Date): Session {
    const last = this.sessions.at(-1)
    if (last) {
      if (last.end) {
        throw new Error('No active session.')
      }
      last.end = end
      this.updateSessions(
        this.sessions.map((s) => {
          if (s.start.getTime() == last.start.getTime()) {
            s.end = last.end
          }
          return s
        })
      )
      return last
    }
    throw new Error('Sessions storage is empty.')
  }

  get sessions(): Session[] {
    const sessions = localStorage.getItem(LocalStorageDataGateway.SESSIONS_ID)
    if (sessions) {
      return mapToEntity(sessions)
    }
    return []
  }
}
