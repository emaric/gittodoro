import { Duration } from '@/core/entities/Duration';
import { DurationRepository } from '@/core/repositories/DurationRepository';

export class DurationLocalStorage extends DurationRepository {
  static ITEM_ID = 'DefaultDuration';
  static DEFAULT_DURATION = {
    id: '0',
    pomodoro: 50,
    short: 10,
    long: 20,
    longInterval: 4,
  };

  constructor() {
    super();
    if (!localStorage) {
      throw new Error(
        'Error trying to access localStorage in persistence.local.DurationStorage.'
      );
    }
  }

  toDurationEntity({ id, pomodoro, short, long, longInterval }) {
    return new Duration({ id, pomodoro, short, long, longInterval });
  }

  getDefaultDuration() {
    const durationString = localStorage.getItem(DurationLocalStorage.ITEM_ID);
    const duration = durationString
      ? JSON.parse(durationString)
      : DurationLocalStorage.DEFAULT_DURATION;
    return Promise.resolve(this.toDurationEntity(duration));
  }
}
