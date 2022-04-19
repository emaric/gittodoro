import "core-js/actual"

import { MainClockProvider } from '@/context/MainClockContextProvider'
import { SessionProvider } from '@/context/SessionContextProvider'
import { AppProps } from 'next/app'
import '../styles/globals.css'
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
