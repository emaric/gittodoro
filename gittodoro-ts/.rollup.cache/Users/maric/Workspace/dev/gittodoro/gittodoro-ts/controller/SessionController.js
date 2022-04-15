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
export { SessionController };
//# sourceMappingURL=SessionController.js.map