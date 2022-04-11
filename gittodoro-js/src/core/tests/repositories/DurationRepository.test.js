import { Duration } from '@/core/entities/Duration';
import { DurationRepository } from '@/core/repositories/DurationRepository';
import { DurationRepositoryImplementation } from '@/core/tests/repositories/DurationRepositoryImplementation';

describe('[DurationRepository] unit tests', () => {
  describe('when trying to instantiate DurationRepository', () => {
    it('should throw an exception', () => {
      expect(() => {
        const durationRepository = new DurationRepository();
      }).toThrow();
    });
  });

  describe('when implementing DurationRespository', () => {
    it('should throw an exception when the required methods are not overridden', () => {
      class Bad extends DurationRepository {
        constructor() {
          super();
        }
      }

      const bad = new Bad();
      expect(() => bad.getDefaultDuration()).toThrow();
    });
  });

  describe('[DurationRepositoryImplementation] unit tests', () => {
    describe('when trying to get the first Duration from storage', () => {
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
});
