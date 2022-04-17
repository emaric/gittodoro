import { NoteDataGatewayInterface } from '@/interactor/data-gateways/NoteDataGatewayInterface'
import { NoteRequest } from '@/interactor/requests/NoteRequest'
import { NoteCommandInterface } from '@/interactor/requests/NoteCommandInterface'
import { NotePresenterInterface } from '@/interactor/responses/NotePresenterInterface'
import { mapNote } from '@/interactor/use-cases/mapper/EntityResponseMapper'

class CreateNoteCommand implements NoteCommandInterface {
  dataGateway: NoteDataGatewayInterface
  presenter: NotePresenterInterface

  constructor(
    dataGateway: NoteDataGatewayInterface,
    presenter: NotePresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  execute(request: NoteRequest): void {
    const note = this.dataGateway.create({
      id: -1,
      date: request.date || new Date(),
      content: request.content || '',
    })
    this.presenter.present(mapNote(note))
  }
}

class ReadNoteCommand implements NoteCommandInterface {
  dataGateway: NoteDataGatewayInterface
  presenter: NotePresenterInterface

  constructor(
    dataGateway: NoteDataGatewayInterface,
    presenter: NotePresenterInterface
  ) {
    this.dataGateway = dataGateway
    this.presenter = presenter
  }

  execute(request: NoteRequest): void {
    console.log('request....', request)
    if (request.id != undefined) {
      const note = this.dataGateway.read(request.id)
      this.presenter.present(mapNote(note))
    } else {
      throw new Error('ReadNoteCommand requires id.')
    }
  }
}

export const createNoteCommand = (
  dataGateway: NoteDataGatewayInterface,
  presenter: NotePresenterInterface
) => {
  return new CreateNoteCommand(dataGateway, presenter)
}

export const readNoteCommand = (
  dataGateway: NoteDataGatewayInterface,
  presenter: NotePresenterInterface
) => {
  return new ReadNoteCommand(dataGateway, presenter)
}
