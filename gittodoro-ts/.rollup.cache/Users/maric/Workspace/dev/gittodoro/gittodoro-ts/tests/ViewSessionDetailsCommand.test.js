import { Duration } from '@/interactor/entities/Duration';
import { Session } from '@/interactor/entities/Session';
import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper';
import { ViewSessionDetailsCommand } from '@/interactor/use-cases/ViewSessionDetailsCommand';
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage';
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter';
describe('[ViewSessionDetails] unit tests', function () {
    describe('when trying to execute View Session Details command', function () {
        it('should should return a session with the same start date', function () {
            var duration = new Duration({
                id: 0,
                pomodoro: 25,
                short: 5,
                long: 15,
                longInterval: 4,
            });
            var sampleSession = new Session({
                id: 0,
                start: new Date('2022-04-12T09:00:00'),
                duration: duration,
            });
            var dataGateway = new SessionInMemoryStorage([sampleSession]);
            var sessionPresenter = new SessionStringOutputPresenter('View Session Details: ');
            var viewSessionDetailsCommand = new ViewSessionDetailsCommand(dataGateway, sessionPresenter);
            var request = {
                start: new Date('2022-04-12T09:00:00'),
                message: 'View session details',
            };
            viewSessionDetailsCommand.execute(request);
            var expectedOutput = 'View Session Details: ' + JSON.stringify(mapSession(sampleSession));
            expect(sessionPresenter.output).toBe(expectedOutput);
        });
    });
});
//# sourceMappingURL=ViewSessionDetailsCommand.test.js.map