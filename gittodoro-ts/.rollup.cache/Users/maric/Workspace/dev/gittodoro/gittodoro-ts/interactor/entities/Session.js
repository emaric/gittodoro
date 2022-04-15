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
export { Session };
//# sourceMappingURL=Session.js.map