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
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var SessionController = /** @class */ (function () {
    function SessionController() {
    }
    SessionController.prototype.startSession = function (interactor, request) {
        interactor.execute(request);
    };
    SessionController.prototype.endSession = function (interactor, request) {
        interactor.execute(request);
    };
    SessionController.prototype.viewSession = function (interactor, request) {
        interactor.execute(request);
    };
    return SessionController;
}());
var State$1;
(function (State) {
    State[State["pomodoro"] = 0] = "pomodoro";
    State[State["short"] = 1] = "short";
    State[State["long"] = 2] = "long";
})(State$1 || (State$1 = {}));
var mapTimerSequence$1 = function (timerSequence) {
    return timerSequence.map(function (stateTimer) {
        return ({
            state: State$1[stateTimer.state],
            duration: stateTimer.duration,
        });
    });
};
var mapSession$1 = function (session) {
    return __assign(__assign(__assign({}, session), session.duration), { timerSequenceDuration: session.timerSequenceDuration, timerSequence: mapTimerSequence$1(session.timerSequence) });
};
var EndSessionCommand = /** @class */ (function () {
    function EndSessionCommand(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    EndSessionCommand.prototype.execute = function (request) {
        var session = this.sessionDataGateway.endSession(request.end);
        this.sessionPresenter.present(mapSession$1(session));
    };
    return EndSessionCommand;
}());
var StartSessionCommand = /** @class */ (function () {
    function StartSessionCommand(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    StartSessionCommand.prototype.execute = function (request) {
        var session = this.sessionDataGateway.createSession(__assign({}, request));
        this.sessionPresenter.present(mapSession$1(session));
    };
    return StartSessionCommand;
}());
var State;
(function (State) {
    State[State["pomodoro"] = 0] = "pomodoro";
    State[State["short"] = 1] = "short";
    State[State["long"] = 2] = "long";
})(State || (State = {}));
var Session$1 = /** @class */ (function () {
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
var mapTimerSequence = function (timerSequence) {
    return timerSequence.map(function (ts) {
        return ({
            state: State[ts.state],
            duration: ts.duration,
        });
    });
};
var mapSession = function (session) {
    return new Session$1(__assign(__assign({}, session), { timerSequence: mapTimerSequence(session.timerSequence) }));
};
var SessionCLIPresenter = /** @class */ (function () {
    function SessionCLIPresenter(cliView) {
        this.cliView = cliView;
    }
    SessionCLIPresenter.prototype.present = function (response) {
        this.cliView.display(mapSession(response));
    };
    return SessionCLIPresenter;
}());
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
                    return { state: State$1.long, duration: _this.long };
                }
                else if (index % 2 == 0) {
                    return { state: State$1.pomodoro, duration: _this.pomodoro };
                }
                else {
                    return { state: State$1.short, duration: _this.short };
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    return Duration;
}());
var Session = /** @class */ (function () {
    function Session(params) {
        this.id = params.id;
        this.start = params.start;
        this.end = params.end;
        this.duration = params.duration;
    }
    Object.defineProperty(Session.prototype, "timerSequenceDuration", {
        get: function () {
            return this.duration.timerSequenceDuration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "timerSequence", {
        get: function () {
            return this.duration.timerSequence;
        },
        enumerable: false,
        configurable: true
    });
    Session.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Session;
}());
var SessionInMemory = /** @class */ (function () {
    function SessionInMemory(storage) {
        this.storage = storage;
    }
    SessionInMemory.prototype.createSession = function (args) {
        var session = new Session(__assign(__assign({}, args), { id: this.storage.length, duration: new Duration(__assign(__assign({}, args), { id: -1 })) }));
        this.storage.push(session);
        return session;
    };
    SessionInMemory.prototype.readSession = function (start) {
        var session = this.storage.find(function (session) { return session.start.getTime() == start.getTime(); });
        if (!session) {
            throw new Error('Not found.');
        }
        return session;
    };
    SessionInMemory.prototype.endSession = function (end) {
        var last = this.storage.length - 1;
        this.storage[last].end = end;
        return this.storage[last];
    };
    return SessionInMemory;
}());
var SessionCLIApp = /** @class */ (function () {
    function SessionCLIApp(cliView) {
        this.storage = new SessionInMemory([]);
        this.presenter = new SessionCLIPresenter(cliView);
        this.controller = new SessionController();
    }
    SessionCLIApp.prototype.start = function () {
        if (!this.startCommand) {
            this.startCommand = new StartSessionCommand(this.storage, this.presenter);
        }
        this.startCommand.execute(__assign({ message: 'Start a session', start: new Date() }, SessionCLIApp.DEFAULT_DURATION));
    };
    SessionCLIApp.prototype.stop = function () {
        if (!this.stopCommand) {
            this.stopCommand = new EndSessionCommand(this.storage, this.presenter);
        }
        this.stopCommand.execute({
            message: 'End a session',
            end: new Date(),
        });
    };
    SessionCLIApp.DEFAULT_DURATION = {
        pomodoro: 25,
        short: 5,
        long: 10,
        longInterval: 4,
    };
    return SessionCLIApp;
}());
var cli = new CLI();
var app = new SessionCLIApp(cli);
var run = function () {
    console.log('This sample gittodoro app is running...');
    console.log('Use case #1: The user can start a session.');
    app.start();
    return 0;
};
var stop = function () {
    console.log('Use case #2: This user can stop a session.');
    app.stop();
    return 0;
};
var app$1 = {
    run: run,
    stop: stop,
};
console.log(app$1);
export { app$1 as app };
//# sourceMappingURL=app.ts.map
//# sourceMappingURL=app.js.map