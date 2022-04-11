import {
  ViewDurationDetailsRequester,
  Response,
} from '@/core/use-cases/ViewDurationDetailsRequester';

export class ViewDurationDetailsGenerator extends ViewDurationDetailsRequester {
  constructor(durationRepository) {
    super();
    this.durationRepository = durationRepository;
  }

  async getDefaultDuration(request) {
    const duration = await this.durationRepository.getDefaultDuration();

    const durationResponse = new Response(duration);

    return Promise.resolve(durationResponse);
  }
}
