import './LocalStorageMock';

import { Duration } from '@/core/entities/Duration';
import { DurationLocalStorage } from '@/persistence/local/DurationLocalStorage';

describe('[DurationLocalStorage] unit tests', () => {
  describe('when the localStorage is empty', () => {
    it('should return a default Duration with an id of 0', async () => {
      const durationRepo = new DurationLocalStorage();

      const actualDuration = await durationRepo.getDefaultDuration();

      expect(actualDuration.id).toEqual('0');
      expect(actualDuration instanceof Duration).toBe(true);
    });

    it('should return a Duration instance of the stored default duration', async () => {
      const saveDefaultDurationToLocalStorage = (sampleDuration) => {
        localStorage.setItem(
          DurationLocalStorage.ITEM_ID,
          JSON.stringify(sampleDuration)
        );
      };

      const sampleDuration = {
        id: 1,
        pomodoro: 25,
        short: 5,
        long: 15,
        longInterval: 4,
      };

      saveDefaultDurationToLocalStorage(sampleDuration);

      const durationRepo = new DurationLocalStorage();
      const actualDuration = await durationRepo.getDefaultDuration();

      expect(actualDuration).toEqual(sampleDuration);
      expect(actualDuration instanceof Duration).toBe(true);
    });
  });
});
