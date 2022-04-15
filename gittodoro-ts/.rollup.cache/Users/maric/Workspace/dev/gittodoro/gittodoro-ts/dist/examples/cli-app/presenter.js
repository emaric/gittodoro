import { mapSession } from './response-view-mapper';
var SessionCLIPresenter = /** @class */ (function () {
    function SessionCLIPresenter(cliView) {
        this.cliView = cliView;
    }
    SessionCLIPresenter.prototype.present = function (response) {
        this.cliView.display(mapSession(response));
    };
    return SessionCLIPresenter;
}());
export { SessionCLIPresenter };
//# sourceMappingURL=presenter.js.map