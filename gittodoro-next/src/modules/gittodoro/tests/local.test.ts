import { LocalStorageData } from '../local'

import './MockLocalStorage'

describe('[local] unit tests', () => {
  describe('when trying to create sessions', () => {
    const gateway = new LocalStorageData()
    const date = new Date('2022-04-15T00:01:00.000Z')
    let expectedSession: any
    it('should save to the localstorage as a json string list', () => {
      expectedSession = gateway.createSession({
        start: date,
        pomodoro: 50,
        short: 5,
        long: 15,
        longInterval: 4,
      })

      const actual = localStorage.getItem(LocalStorageData.SESSIONS_ID)
      const expected =
        '[{"id":0,"start":"2022-04-15T00:01:00.000Z","duration":{"id":-1,"pomodoro":50,"short":5,"long":15,"longInterval":4}}]'

      expect(actual).toBe(expected)
    })

    it('should be able to load the previously saved session', () => {
      const session = gateway.readSession(date)
      expect(session).toEqual(expectedSession)
    })
  })
})
