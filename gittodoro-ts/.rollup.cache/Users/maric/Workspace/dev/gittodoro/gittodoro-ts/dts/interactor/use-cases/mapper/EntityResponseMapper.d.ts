import { Session } from '../../entities/Session';
import { StateTimer } from '../../entities/StateTimer';
import { SessionResponse, StateTimer as StateTimerResponse } from '../../responses/SessionResponse';
export declare const mapTimerSequence: (timerSequence: StateTimer[]) => StateTimerResponse[];
export declare const mapSession: (session: Session) => SessionResponse;
