var SessionStringOutputPresenter = /** @class */ (function () {
    function SessionStringOutputPresenter(output) {
        this.output = output;
    }
    SessionStringOutputPresenter.prototype.present = function (session) {
        this.output = this.output + JSON.stringify(session);
    };
    return SessionStringOutputPresenter;
}());
export { SessionStringOutputPresenter };
//# sourceMappingURL=SessionStringOutputPresenter.js.map