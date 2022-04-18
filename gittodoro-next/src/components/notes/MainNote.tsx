
import { Note } from "@/models/Note"

import styles from './Note.module.css'
import { NoteContent } from "./NoteContent"
import * as Button from "./buttons"

interface Props {
  note: Note
}
export const MainNote = ({ note }: Props) => {
  return (
    <article className={styles.note_container}>
      <div className={styles.header}>
        <Button.Hide />
        <div className={styles.buttons_container}>
          <Button.Delete />
          <Button.Edit />
          <Button.Copy />
        </div>
      </div>
      <div className={styles.content}>
        <NoteContent>{note.content}</NoteContent>
      </div>
    </article>
  )
}