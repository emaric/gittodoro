export class ViewDurationDetailsRequester {
  constructor() {
    if (this.constructor === ViewDurationDetailsRequester) {
      throw new Error(
        'Error trying to instantiate an Abstract Class, core.use-case.ViewDurationDetailsRequester.'
      );
    }
  }

  getDefaultDuration(request) {
    throw new Error('Not implemented.');
  }
}

export class Request {
  constructor({ id = 0, user }) {
    this.id = id;
    this.user = user;
  }
}

export class Response {
  constructor({ id, pomodoro, short, long, longInterval }) {
    this.id = id;
    this.pomodoro = pomodoro;
    this.short = short;
    this.long = long;
    this.longInterval = longInterval;
  }
}
