import styles from './Note.module.css'

import * as Button from './buttons'

export const NoteEditor = () => {
  return (
    <section className={styles.note_container}>
      <div className={styles.header}>
        <Button.Hide />
        <div className={styles.buttons_container}>
          <Button.Close />
        </div>
      </div>
      <div className={styles.content}>
        <textarea name="content" id="note_content"></textarea>
      </div>
    </section>
  )
}