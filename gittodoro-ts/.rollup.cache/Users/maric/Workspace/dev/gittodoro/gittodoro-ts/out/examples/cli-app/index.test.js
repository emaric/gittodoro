import app from '@/examples/cli-app/index';
import { SessionCLIApp } from './controller';
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
describe('[index] unit tests', function () {
    describe('when trying to start a new session for up to one long break interval', function () {
        var duration = SessionCLIApp.DEFAULT_DURATION;
        var consoleLog = jest.fn();
        console.log = consoleLog;
        app.run();
        it('should display the first state pomodoro and the remaining time', function () {
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(consoleLog.mock.calls.at(-1).at(-1)).toBe('pomodoro : ' + duration.pomodoro);
        });
        it('should display the short state and the remaining time', function () {
            jest.advanceTimersByTime(duration.pomodoro * 1000);
            expect(setTimeout).toHaveBeenCalledTimes(2);
            expect(consoleLog.mock.calls.at(-1).at(-1)).toBe('short : ' + duration.short);
        });
        it('should display the long state and the remaining time', function () {
            var elapsedTime = duration.pomodoro;
            var timeTillLongState = duration.longInterval * duration.pomodoro +
                (duration.longInterval - 1) * duration.short -
                elapsedTime;
            jest.advanceTimersByTime(timeTillLongState * 1000);
            expect(setTimeout).toHaveBeenCalledTimes(duration.longInterval * 2);
            expect(consoleLog.mock.calls.at(-1).at(-1)).toBe('long : ' + duration.long);
        });
        it('should display that the session has ended when stop is called', function () {
            jest.advanceTimersByTime(duration.long * 1000);
            expect(consoleLog.mock.calls.at(-1).at(-1)).toBe('pomodoro : ' + duration.pomodoro);
            app.stop();
            expect(consoleLog.mock.calls.at(-1).at(-1)).toBe('Session has ended.');
        });
        it('should output the process', function () {
            var output = consoleLog.mock.calls.join('\n');
            var expected = "This sample gittodoro app is running...\nUse case #1: The user can start a session.\nStarting a session...\npomodoro : 25\npomodoro : 24\npomodoro : 23\npomodoro : 22\npomodoro : 21\npomodoro : 20\npomodoro : 19\npomodoro : 18\npomodoro : 17\npomodoro : 16\npomodoro : 15\npomodoro : 14\npomodoro : 13\npomodoro : 12\npomodoro : 11\npomodoro : 10\npomodoro : 9\npomodoro : 8\npomodoro : 7\npomodoro : 6\npomodoro : 5\npomodoro : 4\npomodoro : 3\npomodoro : 2\npomodoro : 1\npomodoro : 0\nshort : 5\nshort : 4\nshort : 3\nshort : 2\nshort : 1\nshort : 0\npomodoro : 25\npomodoro : 24\npomodoro : 23\npomodoro : 22\npomodoro : 21\npomodoro : 20\npomodoro : 19\npomodoro : 18\npomodoro : 17\npomodoro : 16\npomodoro : 15\npomodoro : 14\npomodoro : 13\npomodoro : 12\npomodoro : 11\npomodoro : 10\npomodoro : 9\npomodoro : 8\npomodoro : 7\npomodoro : 6\npomodoro : 5\npomodoro : 4\npomodoro : 3\npomodoro : 2\npomodoro : 1\npomodoro : 0\nshort : 5\nshort : 4\nshort : 3\nshort : 2\nshort : 1\nshort : 0\npomodoro : 25\npomodoro : 24\npomodoro : 23\npomodoro : 22\npomodoro : 21\npomodoro : 20\npomodoro : 19\npomodoro : 18\npomodoro : 17\npomodoro : 16\npomodoro : 15\npomodoro : 14\npomodoro : 13\npomodoro : 12\npomodoro : 11\npomodoro : 10\npomodoro : 9\npomodoro : 8\npomodoro : 7\npomodoro : 6\npomodoro : 5\npomodoro : 4\npomodoro : 3\npomodoro : 2\npomodoro : 1\npomodoro : 0\nshort : 5\nshort : 4\nshort : 3\nshort : 2\nshort : 1\nshort : 0\npomodoro : 25\npomodoro : 24\npomodoro : 23\npomodoro : 22\npomodoro : 21\npomodoro : 20\npomodoro : 19\npomodoro : 18\npomodoro : 17\npomodoro : 16\npomodoro : 15\npomodoro : 14\npomodoro : 13\npomodoro : 12\npomodoro : 11\npomodoro : 10\npomodoro : 9\npomodoro : 8\npomodoro : 7\npomodoro : 6\npomodoro : 5\npomodoro : 4\npomodoro : 3\npomodoro : 2\npomodoro : 1\npomodoro : 0\nlong : 10\nlong : 9\nlong : 8\nlong : 7\nlong : 6\nlong : 5\nlong : 4\nlong : 3\nlong : 2\nlong : 1\nlong : 0\npomodoro : 25\nUse case #2: This user can stop a session.\nStoping a session...\nSession has ended.";
            expect(output).toBe(expected);
        });
    });
});
//# sourceMappingURL=index.test.js.map