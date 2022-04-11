import { Duration } from '@/core/entities/Duration';
import { DurationRepository } from '@/core/repositories/DurationRepository';

export class DurationRepositoryImplementation extends DurationRepository {
  constructor(storage) {
    super();
    this.storage = storage;
  }

  toDurationEntity({ id, pomodoro, short, long, longInterval }) {
    return new Duration({ id, pomodoro, short, long, longInterval });
  }

  getDefaultDuration() {
    const duration = this.storage[0];

    const durationEntity = this.toDurationEntity(duration);
    return Promise.resolve(durationEntity);
  }
}
