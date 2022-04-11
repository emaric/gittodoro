import { Response } from '@/core/use-cases/ViewDurationDetailsRequester';

export class ViewDurationDetailsPresenter {
  constructor() {
    if (this.constructor === ViewDurationDetailsPresenter) {
      throw new Error(
        'Error trying to instantiate an Abstract Class, controller.ViewDurationDetailsPresenter.'
      );
    }
  }

  render(duration) {
    throw new Error('Not implemented.');
  }
}
