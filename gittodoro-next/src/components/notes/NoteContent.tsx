import { Markdown } from '@/modules/markdown'

interface Props {
  children: string
}

export const NoteContent = ({ children }: Props) => {
  return <Markdown>{children}</Markdown>
}