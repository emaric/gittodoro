import { __assign } from "tslib";
import { State } from '../../entities/State';
export var mapTimerSequence = function (timerSequence) {
    return timerSequence.map(function (stateTimer) { return ({
        state: State[stateTimer.state],
        duration: stateTimer.duration,
    }); });
};
export var mapSession = function (session) {
    return __assign(__assign(__assign({}, session), session.duration), { timerSequenceDuration: session.timerSequenceDuration, timerSequence: mapTimerSequence(session.timerSequence) });
};
//# sourceMappingURL=EntityResponseMapper.js.map