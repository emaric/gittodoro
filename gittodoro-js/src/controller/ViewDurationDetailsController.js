import { Request } from '@/core/use-cases/ViewDurationDetailsRequester';

export class ViewDurationDetailsController {
  constructor(requester, presenter) {
    this.requester = requester;
    this.presenter = presenter;
  }

  execute() {
    const request = new Request({ id: 0 });
    const response = this.requester.getDefaultDuration(request);
    this.presenter.render(response);
  }
}
