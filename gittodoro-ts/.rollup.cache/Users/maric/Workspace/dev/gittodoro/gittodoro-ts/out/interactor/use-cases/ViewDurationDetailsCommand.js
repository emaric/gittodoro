import { __assign } from "tslib";
var ViewDurationDetailsCommand = /** @class */ (function () {
    function ViewDurationDetailsCommand(dataGateway, presenter) {
        this.dataGateway = dataGateway;
        this.presenter = presenter;
    }
    ViewDurationDetailsCommand.prototype.execute = function (request) {
        console.log(request);
        var duration = this.dataGateway.getDefaultDuration();
        this.presenter.present(__assign({}, duration));
    };
    return ViewDurationDetailsCommand;
}());
export { ViewDurationDetailsCommand };
//# sourceMappingURL=ViewDurationDetailsCommand.js.map