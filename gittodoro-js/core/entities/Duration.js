export class Duration {
  id;
  pomodoro;
  short;
  long;
  longInterval;

  constructor({ id, pomodoro, short, long, longInterval }) {
    this.id = id;
    this.pomodoro = pomodoro;
    this.short = short;
    this.long = long;
    this.longInterval = longInterval;
  }
}
