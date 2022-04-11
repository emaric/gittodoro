import { DurationRepository } from '@/core/repository/DurationRepository';
import { DurationRepositoryImplementation } from '@/core/test/DurationRepositoryImplementation';
import { Duration } from '@/core/entities/Duration';

describe('[DurationRepository] unit tests', () => {
  describe('when trying to instantiate DurationRepository', () => {
    it('should throw an exception', () => {
      expect(() => {
        const durationRepository = new DurationRepository();
      }).toThrow();
    });
  });

  describe('[DurationRepositoryImplementation] unit tests', () => {
    it('should get the a Duration from getDefaultDuration()', async () => {
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

      const actualDuration = await durationRepo.getDefaultDuration();

      const expectedDuration = sampleDuration;

      expect(actualDuration).toEqual(expectedDuration);
      expect(actualDuration instanceof Duration);
    });
  });
});
