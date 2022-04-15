import { __assign } from "tslib";
import { SessionController } from '../../controller/SessionController';
import { EndSessionCommand } from '../../interactor/use-cases/EndSessionCommand';
import { StartSessionCommand } from '../../interactor/use-cases/StartSessionCommand';
import { SessionCLIPresenter } from './presenter';
import { SessionInMemory } from './db';
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
export { SessionCLIApp };
//# sourceMappingURL=controller.js.map