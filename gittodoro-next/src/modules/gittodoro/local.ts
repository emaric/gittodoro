import { SessionDataGatewayInterface } from '@emaric/gittodoro-ts/interactor/data-gateways/SessionDataGatewayInterface'
import { Session } from '@emaric/gittodoro-ts/interactor/entities/Session'
import { Duration } from '@emaric/gittodoro-ts/interactor/entities/Duration'

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

  createSession(args: {
    start: Date
    pomodoro: number
    short: number
    long: number
    longInterval: number
  }) {
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

    localStorage.setItem(
      LocalStorageDataGateway.SESSIONS_ID,
      mapToString(sessions)
    )

    return session
  }
  readSession(start: Date) {
    return this.sessions.find(
      (session) => session.start.getTime() == start.getTime()
    )
  }
  endSession(end: Date) {
    throw new Error('Method not implemented.')
  }

  get sessions(): Session[] {
    const sessions = localStorage.getItem(LocalStorageDataGateway.SESSIONS_ID)
    if (sessions) {
      return mapToEntity(sessions)
    }
    return []
  }
}