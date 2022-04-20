import { useCallback, useEffect, useState } from 'react'

import { Note } from '@/models/Note'
import { useMainNotes } from '@/context/MainNotesContextProvider'

import styles from './Note.module.css'

import * as Button from './buttons'
import { MainNote } from './MainNote'

export const MainNotes = () => {
  const { mainNotes: notes, newNote, createNote, updateNote, deleteNote } = useMainNotes()
  const [openNote, setOpenNote] = useState<Note | undefined>(undefined)

  const handleAddNote = useCallback(async () => {
    await Promise.resolve(createNote(`**Interruptions**
- write internal/external interruptions here
- you can deal with them later
 \\
 \\
**Tasks**
1. [ ] write the tasks you want to focus on
1. [x] check the tasks you finished
  \\
  \\
**Additional notes:**
- write the problems you encountered
- write the solutions you used to solve the problems
- make sure to take breaks!`, new Date()))
  }, [createNote])

  const handleChange = useCallback((n: Note) => {
    updateNote(n)
  }, [updateNote])

  const handleClickEdit = useCallback((note: Note, editing: boolean) => {
    if (!editing && note.id == openNote?.id) {
      setOpenNote(undefined)
    } else {
      editing && setOpenNote(note)
    }
  }, [openNote])

  const handleClickDelete = useCallback((note: Note) => {
    deleteNote(note.id)
  }, [deleteNote])

  useEffect(() => {
    if (newNote) {
      setOpenNote(newNote)
    }
  }, [newNote])

  return (
    <>
      <div className={styles.buttons_container}>
        <Button.Add onClick={handleAddNote} />
      </div>
      <div className={styles.container}>
        {notes?.map((note, i) =>
          <MainNote
            key={i}
            note={note}
            onChange={handleChange}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
            editing={note.id == openNote?.id} />
        )}
      </div>
    </>
  )
}