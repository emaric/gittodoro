import { __assign } from "tslib";
import { Session } from './models/Session';
import { State } from './models/State';
export var mapTimerSequence = function (timerSequence) {
    return timerSequence.map(function (ts) { return ({
        state: State[ts.state],
        duration: ts.duration,
    }); });
};
export var mapSession = function (session) {
    return new Session(__assign(__assign({}, session), { timerSequence: mapTimerSequence(session.timerSequence) }));
};
//# sourceMappingURL=response-view-mapper.js.map