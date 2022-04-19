import { AppProps } from 'next/app'

import "core-js/actual"

import '../styles/globals.css'

import { MainClockProvider } from '@/context/MainClockContextProvider'
import { SessionProvider } from '@/context/SessionContextProvider'
import { MainNotesProvider } from "@/context/MainNotesContextProvider"

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <MainClockProvider>
      <SessionProvider>
        <MainNotesProvider>
          <Component {...pageProps} />
        </MainNotesProvider>
      </SessionProvider>
    </MainClockProvider>
  )
}

export default MyApp
