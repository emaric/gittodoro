import styles from './Note.module.css'

import * as Icon from './icons'

export const Add = () => {
  return (
    <a className={styles.add_button} href="#">ADD NOTE</a>
  )
}

export const Edit = () => {
  return (
    <button title='Edit'>
      <Icon.Edit />
    </button>
  )
}

export const Delete = () => {
  return (
    <button title='Delete'>
      <Icon.Delete />
    </button>
  )
}

export const Copy = () => {
  return (
    <button title='Copy'>
      <Icon.Copy />
    </button>
  )
}

export const Hide = () => {
  return (
    <button className={styles.secondary_button} title='Hide'>
      <Icon.Hide />
    </button>
  )
}

export const Close = () => {
  return (
    <button title='Close'>
      <Icon.Close />
    </button>
  )
}