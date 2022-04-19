import { createContext, useMemo, ReactNode, useContext, useEffect, useState, useCallback } from "react"

import { Note as ModuleNote } from '@/modules/gittodoro/models/Note'
import { NotesView } from '@/modules/gittodoro/views/NotesView'
import { NoteView } from "@/modules/gittodoro/views/NoteView"
import { NotesController } from "@/modules/gittodoro/controllers/NotesController"
import { NoteController } from "@/modules/gittodoro/controllers/NoteController"
import * as DateTime from '@/modules/temporal/DateTime'

import { Note } from "@/models/Note"

import { useMainClock } from "./MainClockContextProvider"


type MainNotesContextType = {
  mainNotes?: Note[],
  createNote: (content: string, date?: Date) => void,
  updateNote: (note: Note) => void,
  deleteNote: (id: number) => void,
  mainNote?: Note
}

const MainNotesContext = createContext<MainNotesContextType | undefined>(undefined)

export const MainNotesProvider = (props: { children: ReactNode }) => {
  const { mainClock } = useMainClock()
  const [mainNote, setMainNote] = useState<Note | undefined>(undefined)
  const [mainNotes, setMainNotes] = useState<Note[]>([])

  const notesView = useMemo(() => {
    return new NotesView((moduleNotes: ModuleNote[]) => {
      setMainNotes(moduleNotes.map(note => new Note(note)))
    })
  }, [setMainNotes])

  const notesController = useMemo(() => {
    if (notesView) {
      return new NotesController(notesView)
    }
  }, [notesView])

  const noteView = useMemo(() => {
    return new NoteView((moduleNote: ModuleNote) => {
      if (moduleNote.id > 0) {
        setMainNote(new Note(moduleNote))
      }
    })
  }, [setMainNote])

  const noteController = useMemo(() => {
    if (noteView) {
      return new NoteController(noteView)
    }
    throw new Error('noteController is undefined...')
  }, [noteView])

  const filterNotes = useCallback(() => {
    if (mainClock) {
      const filtered = mainNotes.filter(note => {
        const noteDate = DateTime.fromUTC(note.date)
        const diff = DateTime.difference(noteDate, mainClock.start)
        if (diff >= 0) {
          return true;
        } else {
          return DateTime.difference(mainClock.end, noteDate) >= 0
        }
      })

      setMainNotes(filtered)
    } else {
      setMainNotes([])
    }
  }, [mainClock, mainNotes])

  const loadNotesFromStorage = useCallback(() => {
    if (mainClock && notesController) {
      notesController.readByRange(mainClock.startDate, mainClock.endDate)
    }
  }, [mainClock, notesController])

  const createNote = useCallback(async (content: string, date = new Date()) => {
    if (noteController) {
      await Promise.resolve(noteController.create(content, date))
      loadNotesFromStorage()
    } else {
      throw new Error('noteController is undefined...')
    }
  }, [loadNotesFromStorage, noteController])

  const updateNote = useCallback(async (note: Note) => {
    if (noteController) {
      await Promise.resolve(noteController.update(note.id, note.content, new Date()))
      loadNotesFromStorage()
    } else {
      throw new Error('noteController is undefined...')
    }
  }, [loadNotesFromStorage, noteController])

  const deleteNote = useCallback(async (id: number) => {
    if (noteController) {
      await Promise.resolve(noteController.delete(id))
      loadNotesFromStorage()
    } else {
      throw new Error('noteController is undefined...')
    }
  }, [loadNotesFromStorage, noteController])

  useEffect(() => {
    filterNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainClock])

  useEffect(() => {
    if (mainNotes.length == 0) {
      loadNotesFromStorage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadNotesFromStorage])

  return (
    <MainNotesContext.Provider value={{ mainNotes, createNote, updateNote, deleteNote, mainNote }}>
      {props.children}
    </MainNotesContext.Provider>
  )
}

export const useMainNotes = () => {
  const context = useContext(MainNotesContext)

  if (!context) {
    throw new Error('useMainNotes must be used inside a `MainNotesProvider`')
  }

  return context
}