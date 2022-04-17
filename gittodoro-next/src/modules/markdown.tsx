import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  children: string
}

export const Markdown = ({ children }: Props) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{String(children)}</ReactMarkdown>
  )
}
