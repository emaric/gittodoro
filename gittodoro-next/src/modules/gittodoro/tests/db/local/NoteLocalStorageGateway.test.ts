import { Note } from '@emaric/gittodoro-ts/lib/interactor/entities/Note'
import { NoteLocalStorageGateway } from '@/modules/gittodoro/db/local/NoteLocalStorageGateway'

import '@/modules/gittodoro/tests/MockLocalStorage'

describe('[NoteLocalStorageGateway] unit tests', () => {
  describe('when executing CRUD commands for notes', () => {
    const gateway = new NoteLocalStorageGateway()
    let sampleNote: Note
    let updatedNote: Note

    it('should create new Note on create command', () => {
      sampleNote = gateway.create({
        id: -1,
        date: new Date('2022-04-17T09:00:00.000Z'),
        content: 'This is a sample note.',
      })

      const actual = localStorage.getItem(NoteLocalStorageGateway.NOTES_ID)
      const expected =
        '[{"id":0,"date":"2022-04-17T09:00:00.000Z","content":"This is a sample note."}]'

      expect(actual).toBe(expected)
    })

    it('should return a Note with the given id on read command', () => {
      const note = gateway.read(sampleNote.id)
      const actual = note
      const expected = sampleNote
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected))
    })

    it('should update the note on update command', () => {
      updatedNote = gateway.update({
        ...sampleNote,
        content: 'This is an updated Note. -THIS SHOULD BE INCLUDED-',
        updatedAt: new Date('2022-04-17T20:00:00.000Z'),
      })

      const actual = localStorage.getItem(NoteLocalStorageGateway.NOTES_ID)
      const expected =
        '[{"id":0,"date":"2022-04-17T09:00:00.000Z","updatedAt":"2022-04-17T20:00:00.000Z","content":"This is an updated Note. -THIS SHOULD BE INCLUDED-"}]'

      expect(actual).toBe(expected)
    })

    it('should delete the note with the given id', () => {
      // assert that the targetId exists
      const targetId = updatedNote.id
      expect(JSON.stringify(gateway.read(targetId))).toEqual(
        JSON.stringify(updatedNote)
      )

      gateway.delete(targetId)
      expect(() => gateway.read(targetId)).toThrowError('Note not found.')
    })
  })
})