import { mapSession } from './mapper/EntityResponseMapper';
var ViewSessionDetailsCommand = /** @class */ (function () {
    function ViewSessionDetailsCommand(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    ViewSessionDetailsCommand.prototype.execute = function (request) {
        var session = this.sessionDataGateway.readSession(request.start);
        this.sessionPresenter.present(mapSession(session));
    };
    return ViewSessionDetailsCommand;
}());
export { ViewSessionDetailsCommand };
//# sourceMappingURL=ViewSessionDetailsCommand.js.map