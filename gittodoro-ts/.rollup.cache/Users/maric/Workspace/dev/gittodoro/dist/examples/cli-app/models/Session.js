import { State } from './State';
var Session = /** @class */ (function () {
    function Session(obj) {
        this.start = obj.start;
        this.end = obj.end;
        this.pomodoro = obj.pomodoro;
        this.short = obj.short;
        this.long = obj.long;
        this.longInterval = obj.longInterval;
        this.timerSequenceDuration = obj.timerSequenceDuration;
        this.timerSequence = obj.timerSequence;
    }
    Object.defineProperty(Session.prototype, "elapsed", {
        get: function () {
            var from = this.start.getTime() / 1000;
            var to = (this.end ? this.end.getTime() : Date.now()) / 1000;
            return Math.round(to - from);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "state", {
        get: function () {
            return this.calcStateRemainingTime().state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "remainingTime", {
        get: function () {
            return this.calcStateRemainingTime().remainingTime;
        },
        enumerable: false,
        configurable: true
    });
    Session.prototype.calcStateRemainingTime = function () {
        var stateElapsed = this.elapsed % this.timerSequenceDuration;
        var result = { index: -1, sum: 0 };
        this.timerSequence.some(function (a, i) {
            result.index = i;
            result.sum += a.duration;
            if (result.sum > stateElapsed) {
                return true;
            }
        }, result);
        return {
            state: State[this.timerSequence[result.index].state],
            remainingTime: result.sum - stateElapsed,
        };
    };
    Session.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Session;
}());
export { Session };
//# sourceMappingURL=Session.js.map