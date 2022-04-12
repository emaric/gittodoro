import { Session } from '@/interactor/entities/Session'

export interface SessionDataGatewayInterface {
  createSession(start: Date): Session
  endSession(end: Date): Session
}
