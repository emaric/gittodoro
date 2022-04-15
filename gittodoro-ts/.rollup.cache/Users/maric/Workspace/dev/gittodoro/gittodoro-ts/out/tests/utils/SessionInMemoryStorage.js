import { __assign } from "tslib";
import { Duration } from '@/interactor/entities/Duration';
import { Session } from '@/interactor/entities/Session';
var SessionInMemoryStorage = /** @class */ (function () {
    function SessionInMemoryStorage(storage) {
        this.storage = storage;
    }
    SessionInMemoryStorage.prototype.createSession = function (args) {
        var duration = new Duration(__assign(__assign({}, args), { id: -1 }));
        var session = new Session({
            id: this.storage.length,
            start: args.start,
            duration: duration,
        });
        this.storage.push(session);
        return session;
    };
    SessionInMemoryStorage.prototype.readSession = function (start) {
        var session = this.storage.find(function (session) { return session.start.getTime() == start.getTime(); });
        if (!session) {
            throw new Error('Not in storage.');
        }
        return session;
    };
    SessionInMemoryStorage.prototype.endSession = function (end) {
        var last = this.storage.length - 1;
        this.storage[last].end = end;
        return this.storage[last];
    };
    return SessionInMemoryStorage;
}());
export { SessionInMemoryStorage };
//# sourceMappingURL=SessionInMemoryStorage.js.map