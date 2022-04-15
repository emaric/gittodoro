import { __assign } from "tslib";
import { Duration } from '../../interactor/entities/Duration';
import { Session } from '../../interactor/entities/Session';
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
export { SessionInMemory };
//# sourceMappingURL=db.js.map