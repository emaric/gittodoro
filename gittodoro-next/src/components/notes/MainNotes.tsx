import { useCallback, useState } from 'react'

import { Note } from '@/models/Note'

import styles from './Note.module.css'

import * as Button from './buttons'
import { MainNote } from './MainNote'

export const MainNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [openNote, setOpenNote] = useState<Note | undefined>(undefined)
  const [lastId, setLastId] = useState(0)

  const handleAddNote = useCallback(() => {
    const id = lastId + 1
    const newNote = new Note({ id: id, date: new Date(), content: 'new note ' + id })
    setNotes(notes.concat(newNote))
    setOpenNote(newNote)
    setLastId(id)
  }, [notes, lastId])

  const handleChange = useCallback((v: any) => {
    console.log('handle changed', v.content)
    setNotes(notes.map((n) => {
      if (v.id == n.id) {
        return v
      }
      return n
    }))
  }, [notes])

  const handleClickEdit = useCallback((note: Note, editing: boolean) => {
    if (!editing && note.id == openNote?.id) {
      setOpenNote(undefined)
    } else {
      editing && setOpenNote(note)
    }
  }, [openNote])

  const handleClickDelete = useCallback((note: Note) => {
    setNotes(notes.filter((n) => n.id != note.id))
  }, [notes])

  return (
    <>
      <div className={styles.buttons_container}>
        <Button.Add onClick={handleAddNote} />
      </div>
      <div className={styles.container}>
        {notes.map((note, i) =>
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