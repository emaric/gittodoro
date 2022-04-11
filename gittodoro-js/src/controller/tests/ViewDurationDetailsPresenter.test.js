import { ViewDurationDetailsPresenter } from '@/controller/ViewDurationDetailsPresenter';
import { ViewDurationDetailsController } from '@/controller/ViewDurationDetailsController';
import { Response } from '@/core/use-cases/ViewDurationDetailsRequester';

describe('[ViewDurationDetailsPresenter] unit tests', () => {
  describe('when trying to instantiate a new ViewDurationDetailsPresenter object', () => {
    it('should throw an exception', () => {
      expect(() => {
        const newTest = new ViewDurationDetailsPresenter();
      }).toThrow();
    });
  });

  describe('when trying to implement ViewDurationDetailsPresenter', () => {
    it('should override required methods', () => {
      class Bad extends ViewDurationDetailsPresenter {
        constructor() {
          super();
        }
      }

      const bad = new Bad();

      expect(() => bad.render({})).toThrow();
    });
  });

  class ViewDurationDetailsOutput extends ViewDurationDetailsPresenter {
    constructor(output) {
      super();
      this.output = output;
    }

    render(duration) {
      this.output = JSON.stringify(duration);
    }
  }

  describe('when trying to display to given output object', () => {
    it('should display the duration details on the outpu object', () => {
      const presenter = new ViewDurationDetailsOutput('');
      const sampleDuration = new Response({
        id: 0,
        pomodoro: 25,
        short: 5,
        long: 10,
        longInterval: 4,
      });
      const requester = {
        getDefaultDuration: () => sampleDuration,
      };
      const controller = new ViewDurationDetailsController(
        requester,
        presenter
      );

      controller.execute();

      expect(presenter.output).toBe(JSON.stringify(sampleDuration));
    });
  });
});
