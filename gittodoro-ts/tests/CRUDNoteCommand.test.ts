import {
  createNoteCommand,
  readNoteCommand,
} from '@/interactor/use-cases/CRUDNoteCommandFactory'
import { mapNote } from '@/interactor/use-cases/mapper/EntityResponseMapper'
import { NoteRequest } from '@/interactor/requests/NoteRequest'

import { NoteInMemoryStorage } from '@/tests/utils/NoteInMemoryStorage'
import { NoteStringOutputPresenter } from '@/tests/utils/NoteStringOutputPresenter'

describe('[CRUDNoteCommand] unit tests', () => {
  describe('when trying to execute CRUD command for Notes', () => {
    const dataGateway = new NoteInMemoryStorage([])

    it('should create a note on createNoteCommand', () => {
      const presenter = new NoteStringOutputPresenter('Note: ')
      const createCommand = createNoteCommand(dataGateway, presenter)
      const request: NoteRequest = {
        timestamp: new Date(),
        message: 'create a new note',
        date: new Date(),
        content: 'This is a new note!',
      }
      createCommand.execute(request)

      const expectedOutput =
        'Note: ' + JSON.stringify(mapNote(dataGateway.storage[0]))

      expect(presenter.output).toBe(expectedOutput)
    })

    it('should return the details of a saved note on readNoteCommand', () => {
      const presenter = new NoteStringOutputPresenter('Note: ')
      const readCommand = readNoteCommand(dataGateway, presenter)
      console.log(dataGateway.storage)
      const request: NoteRequest = {
        timestamp: new Date(),
        message: 'read a note',
        id: 0,
      }
      readCommand.execute(request)

      const expectedOutput =
        'Note: ' + JSON.stringify(mapNote(dataGateway.storage[0]))

      expect(presenter.output).toBe(expectedOutput)
    })

    it('shoud update the note on updateNoteCommand', () => {
      expect('Not yet implemented.').toBe(true)
    })
  })
})
