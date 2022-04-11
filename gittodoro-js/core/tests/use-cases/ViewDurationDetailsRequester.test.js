import { ViewDurationDetailsRequester } from '@/core/use-cases/ViewDurationDetailsRequester';

describe('[ViewDurationDetailsRequester] unit tests', () => {
  describe('when trying to instantiate a new ViewDurationDetailsRequester', () => {
    it('should throw an exception', () => {
      expect(() => {
        const tryToInstantiate = new ViewDurationDetailsRequester();
      }).toThrow();
    });
  });

  describe('when trying to execute a request', () => {
    it('should should get a response', () => {
      expect('Not yet implemented.').toBe(true);
    });
  });
});
