import { mapSession } from './mapper/EntityResponseMapper';
var EndSessionCommand = /** @class */ (function () {
    function EndSessionCommand(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    EndSessionCommand.prototype.execute = function (request) {
        var session = this.sessionDataGateway.endSession(request.end);
        this.sessionPresenter.present(mapSession(session));
    };
    return EndSessionCommand;
}());
export { EndSessionCommand };
//# sourceMappingURL=EndSessionCommand.js.map