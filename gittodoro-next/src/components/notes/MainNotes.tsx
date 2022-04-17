import { Note } from '@/models/Note'
import { useState } from 'react'

import { MainNote } from './MainNote'
import styles from './Note.module.css'

export const MainNotes = () => {
  const [notes, setNotes] = useState<Note[]>([
    new Note({ id: -5, date: new Date(), content: '- [ ] TODO 1\n- [ ] TODO 2' }),
    new Note({ id: -4, date: new Date(), content: '1. Sample Note 1\n1. Sample Note 2' })
  ])

  return (
    <div className={styles.container}>
      {notes.map((note, i) =>
        <MainNote key={i} note={note} />
      )}
    </div>
  )
}