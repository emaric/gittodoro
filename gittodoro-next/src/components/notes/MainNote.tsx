
import { Note } from "@/models/Note"

import styles from './Note.module.css'
import { NoteContent } from "./NoteContent"

interface Props {
  note: Note
}
export const MainNote = ({ note }: Props) => {
  return (
    <article className={styles.note_container}>
      <div className={styles.content}>
        <NoteContent>{note.content}</NoteContent>
      </div>
    </article>
  )
}