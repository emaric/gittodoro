import { useState } from 'react'

import { Note } from '@/models/Note'

import styles from './Note.module.css'

import * as Button from './buttons'
import { MainNote } from './MainNote'
import { NoteEditor } from './NoteEditor'

export const MainNotes = () => {
  const testContent = `
# H1
## H2
### H3
#### H4
##### H5
###### H6
p
[test](#)
`
  const [notes, setNotes] = useState<Note[]>([
    new Note({ id: -5, date: new Date(), content: '- [ ] TODO 1\n- [x] TODO 2' }),
    new Note({ id: -4, date: new Date(), content: '1. Sample Note 1\n1. Sample Note 2' }),
    new Note({ id: -3, date: new Date(), content: testContent })
  ])

  return (
    <div className={styles.container}>
      <div className={styles.buttons_container}>
        <Button.Add />
      </div>
      <NoteEditor />
      {notes.map((note, i) =>
        <MainNote key={i} note={note} />
      )}
    </div>
  )
}