var CLI = /** @class */ (function () {
    function CLI() {
    }
    CLI.prototype.displayStart = function (session) {
        if (session.end) {
            throw new Error('This session has ended.');
        }
        console.log('Starting a session...');
    };
    CLI.prototype.displayRunningSession = function (session) {
        var _this = this;
        var _a = session.calcStateRemainingTime(), state = _a.state, remainingTime = _a.remainingTime;
        if (remainingTime > 0) {
            console.log(state + ' : ' + remainingTime);
            this.timeoutTimer && clearTimeout(this.timeoutTimer);
            this.timeoutTimer = setTimeout(function () {
                if (_this.timeoutTimer) {
                    clearTimeout(_this.timeoutTimer);
                    console.log(state + ' : ' + 0);
                }
                _this.displayRunningSession(session);
            }, remainingTime * 1000);
            this.intervalTimer && clearInterval(this.intervalTimer);
            var countDown_1 = remainingTime;
            this.intervalTimer = setInterval(function () {
                console.log(state + ' : ' + --countDown_1);
            }, 1000);
        }
        else {
            this.timeoutTimer && clearTimeout(this.timeoutTimer);
            this.intervalTimer && clearInterval(this.intervalTimer);
        }
    };
    CLI.prototype.displayStoppedSession = function (session) {
        if (session.end) {
            console.log('Stoping a session...');
            this.timeoutTimer && clearTimeout(this.timeoutTimer);
            this.intervalTimer && clearInterval(this.intervalTimer);
            console.log('Session has ended.');
        }
        else {
            throw new Error('The session should have an end date.');
        }
    };
    CLI.prototype.display = function (session) {
        if (session.end) {
            this.displayStoppedSession(session);
        }
        else {
            this.displayStart(session);
            this.displayRunningSession(session);
        }
    };
    return CLI;
}());
export { CLI };
//# sourceMappingURL=view.js.map