import { MainClockProvider } from '@/context/MainClockContextProvider'
import { SessionProvider } from '@/context/SessionContextProvider'
import { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <MainClockProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </MainClockProvider>
  )
}

export default MyApp
