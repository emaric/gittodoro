export class DurationRepository {
  constructor() {
    if (this.constructor === DurationRepository) {
      throw new Error(
        'Error trying to instantiate an Abstract Class, core.repository.DurationRepository.'
      );
    }
  }

  getDefaultDuration() {
    throw new Error('Not implemented.');
  }
}
