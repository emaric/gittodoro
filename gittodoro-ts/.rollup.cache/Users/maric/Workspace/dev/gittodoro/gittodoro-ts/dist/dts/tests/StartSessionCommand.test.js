import { StartSessionCommand } from '@/interactor/use-cases/StartSessionCommand';
import { SessionInMemoryStorage } from '@/tests/utils/SessionInMemoryStorage';
import { SessionStringOutputPresenter } from '@/tests/utils/SessionStringOutputPresenter';
import { mapSession } from '@/interactor/use-cases/mapper/EntityResponseMapper';
describe('[StartSessionCommand] unit tests', function () {
    describe('when trying to execute the start session command', function () {
        it('should create an incomplete session', function () {
            var dataGateway = new SessionInMemoryStorage([]);
            var presenter = new SessionStringOutputPresenter('A session has started: ');
            var startSessionCommand = new StartSessionCommand(dataGateway, presenter);
            var request = {
                start: new Date('2022-04-12T00:00:00'),
                pomodoro: 50,
                short: 10,
                long: 20,
                longInterval: 4,
                message: 'This is my first session.',
            };
            startSessionCommand.execute(request);
            var expectedOutput = 'A session has started: ' +
                JSON.stringify(mapSession(dataGateway.storage[0]));
            expect(presenter.output).toBe(expectedOutput);
        });
    });
});
//# sourceMappingURL=StartSessionCommand.test.js.map