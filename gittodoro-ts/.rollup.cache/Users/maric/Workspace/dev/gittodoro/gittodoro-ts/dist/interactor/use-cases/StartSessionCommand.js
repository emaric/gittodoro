import { __assign } from "tslib";
import { mapSession } from '../../interactor/use-cases/mapper/EntityResponseMapper';
var StartSessionCommand = /** @class */ (function () {
    function StartSessionCommand(sessionDataGateway, sessionPresenter) {
        this.sessionDataGateway = sessionDataGateway;
        this.sessionPresenter = sessionPresenter;
    }
    StartSessionCommand.prototype.execute = function (request) {
        var session = this.sessionDataGateway.createSession(__assign({}, request));
        this.sessionPresenter.present(mapSession(session));
    };
    return StartSessionCommand;
}());
export { StartSessionCommand };
//# sourceMappingURL=StartSessionCommand.js.map