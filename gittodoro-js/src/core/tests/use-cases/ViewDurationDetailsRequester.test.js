import { ViewDurationDetailsRequester } from '@/core/use-cases/ViewDurationDetailsRequester';

describe('[ViewDurationDetailsRequester] unit tests', () => {
  describe('when trying to instantiate a new ViewDurationDetailsRequester', () => {
    it('should throw an exception', () => {
      expect(() => {
        const tryToInstantiate = new ViewDurationDetailsRequester();
      }).toThrow();
    });
  });

  describe('when implementing ViewDurationDetailsRequester', () => {
    it('should throw an exception when required methods are not overridden', () => {
      class BadViewDurationDetailsRequester extends ViewDurationDetailsRequester {
        constructor() {
          super();
        }
      }

      const bad = new BadViewDurationDetailsRequester();

      expect(() => bad.getDefaultDuration({})).toThrow();
    });
  });
});
