import { NoteDataGatewayInterface } from '@emaric/gittodoro-ts/lib/interactor/data-gateways/NoteDataGatewayInterface'
import { Note } from '@emaric/gittodoro-ts/lib/interactor/entities/Note'

const mapToEntity = (notesString: string): Note[] => {
  const objs = JSON.parse(notesString)
  return objs.map((obj: any) => {
    const note: Note = {
      id: obj.id,
      date: new Date(obj.date),
      updatedAt:
        obj.date == undefined ? new Date(obj.date) : new Date(obj.updateAt),
      content: obj.content,
    }
    return note
  })
}

const mapToString = (notes: Note[]) => {
  return JSON.stringify(notes)
}

export class NoteLocalStorageGateway implements NoteDataGatewayInterface {
  static NOTES_ID = 'gittodoro-notes'

  private updateNotes(notes: Note[]) {
    localStorage.setItem(NoteLocalStorageGateway.NOTES_ID, mapToString(notes))
  }

  get notes(): Note[] {
    const notes = localStorage.getItem(NoteLocalStorageGateway.NOTES_ID)
    if (notes) {
      return mapToEntity(notes)
    }
    return []
  }

  create(note: Note): Note {
    const id = this.notes.length
    const newNote: Note = {
      ...note,
      id: id,
    }
    this.updateNotes(this.notes.concat(newNote))
    return this.read(id)
  }

  read(id: number): Note {
    const found = this.notes.find((note) => {
      return note.id == id
    })
    if (found) {
      return found
    } else {
      throw new Error('Note not found.')
    }
  }

  update(note: Note): Note {
    this.updateNotes(
      this.notes.map((savedNote) => {
        if (savedNote.id == note.id) {
          return {
            ...note,
          }
        } else {
          return savedNote
        }
      })
    )

    return this.read(note.id)
  }

  delete(id: number): void {
    this.updateNotes(this.notes.filter((note) => note.id != id))
  }
}
