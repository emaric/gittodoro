import { State } from './State';
var Duration = /** @class */ (function () {
    function Duration(params) {
        this.id = params.id;
        this.pomodoro = params.pomodoro;
        this.short = params.short;
        this.long = params.long;
        this.longInterval = params.longInterval;
    }
    Object.defineProperty(Duration.prototype, "timerSequenceDuration", {
        get: function () {
            return (this.longInterval * this.pomodoro +
                (this.longInterval - 1) * this.short +
                this.long);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "timerSequence", {
        get: function () {
            var _this = this;
            var sequence = Array.from(Array(this.longInterval * 2));
            return sequence.map(function (_, index) {
                if (index + 1 == sequence.length) {
                    return { state: State.long, duration: _this.long };
                }
                else if (index % 2 == 0) {
                    return { state: State.pomodoro, duration: _this.pomodoro };
                }
                else {
                    return { state: State.short, duration: _this.short };
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    return Duration;
}());
export { Duration };
//# sourceMappingURL=Duration.js.map