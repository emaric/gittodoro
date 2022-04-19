import { useCallback, useEffect, useState } from 'react'

import { Note } from '@/models/Note'
import { useMainNotes } from '@/context/MainNotesContextProvider'

import styles from './Note.module.css'

import * as Button from './buttons'
import { MainNote } from './MainNote'

export const MainNotes = () => {
  const { mainNotes: notes, mainNote, createNote, updateNote, deleteNote } = useMainNotes()
  const [openNote, setOpenNote] = useState<Note | undefined>(undefined)

  const handleAddNote = useCallback(() => {
    createNote('[insert note template]', new Date())
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
    console.log('MainNotes.tsx : mainNote', mainNote)
  }, [mainNote])

  useEffect(() => {
    console.log('MainNotes.tsx : mainNotes', notes)
  }, [notes])

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