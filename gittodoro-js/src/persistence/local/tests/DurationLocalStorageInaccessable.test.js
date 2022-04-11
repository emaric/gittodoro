import { DurationLocalStorage } from '../DurationLocalStorage';

describe('when localStorage is inaccessible', () => {
  it('should throw an exception', () => {
    global.localStorage = undefined;
    expect(() => {
      const repo = new DurationLocalStorage();
    }).toThrowError(
      'Error trying to access localStorage in persistence.local.DurationStorage.'
    );
  });
});
