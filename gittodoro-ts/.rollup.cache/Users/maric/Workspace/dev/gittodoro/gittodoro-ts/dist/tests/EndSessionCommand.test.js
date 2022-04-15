import { Duration } from '@/interactor/entities/Duration';
import { Session } from '@/interactor/entities/Session';
import { EndSessionCommand } from '@/interactor/use-cases/EndSessionCommand';
import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper';
import { SessionInMemoryStorage } from './utils/SessionInMemoryStorage';
import { SessionStringOutputPresenter } from './utils/SessionStringOutputPresenter';
describe('[EndSessionCommand] unit tests', function () {
    describe('when trying to execute the end session command', function () {
        it('should end the latest unfinished session', function () {
            var duration = new Duration({
                id: 0,
                pomodoro: 25,
                short: 5,
                long: 15,
                longInterval: 4,
            });
            var unfinishedSession = new Session({
                id: 0,
                start: new Date('2022-04-12T00:00:00'),
                duration: duration,
            });
            var dataGateway = new SessionInMemoryStorage([unfinishedSession]);
            var presenter = new SessionStringOutputPresenter('A session has ended: ');
            var endSessionCommand = new EndSessionCommand(dataGateway, presenter);
            var request = {
                end: new Date('2022-04-12T00:00:00'),
                message: 'End my latest unfinished session.',
            };
            endSessionCommand.execute(request);
            var response = mapSession(dataGateway.storage[0]);
            var expectedOutput = 'A session has ended: ' + JSON.stringify(response);
            expect(presenter.output).toBe(expectedOutput);
        });
    });
});
//# sourceMappingURL=EndSessionCommand.test.js.map