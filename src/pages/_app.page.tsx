import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas as fasSolid } from '@fortawesome/free-solid-svg-icons'
import { far as fasRegular } from '@fortawesome/free-regular-svg-icons'
import { SessionProvider } from 'next-auth/react'
import { AppContextProvider } from '@/contexts/AppContext'
import { Toaster } from 'react-hot-toast'

globalStyles()
library.add(fasSolid, fasRegular)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: '#1E1E1E',
              color: '#fff',
            },
            success: {
              style: {
                backgroundColor: '#1E1E1E',
                color: '#fff',
              },
            },
            error: {
              style: {
                backgroundColor: '#1E1E1E',
                color: '#fff',
              },
            },
          }}
        />
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}
