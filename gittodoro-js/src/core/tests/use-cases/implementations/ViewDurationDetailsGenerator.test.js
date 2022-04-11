import {
  Request,
  Response,
} from '@/core/use-cases/ViewDurationDetailsRequester';
import { ViewDurationDetailsGenerator } from '@/core/use-cases/implementations/viewDurationDetailsGenerator';
import { DurationRepositoryImplementation } from '@/core/tests/repositories/DurationRepositoryImplementation';

describe('[ViewDurationDetailsGenerator] unit tests', () => {
  describe('when trying to getDefaultDuration for anonymous user', () => {
    it('should return a ViewDurationDetailsRequester.Response Object', async () => {
      const sampleDuration = {
        id: 0,
        pomodoro: 50,
        short: 10,
        long: 20,
        longInterval: 4,
      };
      const durationRepo = new DurationRepositoryImplementation([
        sampleDuration,
      ]);
      const generator = new ViewDurationDetailsGenerator(durationRepo);
      const request = new Request({ user: undefined });
      const response = await generator.getDefaultDuration(request);
      expect(response).toEqual(sampleDuration);
      expect(response instanceof Response).toBe(true);
    });
  });
});
