import { Duration } from '@/interactor/entities/Duration';
import { ViewDurationDetailsCommand } from '@/interactor/use-cases/ViewDurationDetailsCommand';
var TestDurationDataGateway = /** @class */ (function () {
    function TestDurationDataGateway(defaultDuration) {
        this.defaultDuration = defaultDuration;
    }
    TestDurationDataGateway.prototype.getDefaultDuration = function () {
        return this.defaultDuration;
    };
    return TestDurationDataGateway;
}());
var TestDurationPresenter = /** @class */ (function () {
    function TestDurationPresenter(output) {
        this.output = output;
    }
    TestDurationPresenter.prototype.present = function (duration) {
        this.output = this.output + JSON.stringify(duration);
    };
    return TestDurationPresenter;
}());
describe('[ViewDurationDetailsCommand] unit tests', function () {
    describe('when trying to execute view duration details command', function () {
        it('should get a duration response', function () {
            var sampleDuration = new Duration({
                id: 0,
                pomodoro: 50,
                short: 10,
                long: 15,
                longInterval: 4,
            });
            var testDataGateway = new TestDurationDataGateway(sampleDuration);
            var testPresenter = new TestDurationPresenter('This is the response: ');
            var viewDurationDetailsCommand = new ViewDurationDetailsCommand(testDataGateway, testPresenter);
            var request = {
                timestamp: new Date(),
                message: 'this is a sample request',
            };
            viewDurationDetailsCommand.execute(request);
            var expectedOutput = 'This is the response: ' + JSON.stringify(sampleDuration);
            expect(testPresenter.output).toBe(expectedOutput);
        });
    });
});
//# sourceMappingURL=ViewDurationDetailsCommand.test.js.map