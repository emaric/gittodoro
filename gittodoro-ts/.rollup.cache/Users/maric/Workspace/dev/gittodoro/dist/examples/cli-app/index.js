import { CLI } from './view';
import { SessionCLIApp } from './controller';
var cli = new CLI();
var app = new SessionCLIApp(cli);
var run = function () {
    console.log('This sample gittodoro app is running...');
    console.log('Use case #1: The user can start a session.');
    app.start();
    return 0;
};
var stop = function () {
    console.log('Use case #2: This user can stop a session.');
    app.stop();
    return 0;
};
export default {
    run: run,
    stop: stop,
};
//# sourceMappingURL=index.js.map