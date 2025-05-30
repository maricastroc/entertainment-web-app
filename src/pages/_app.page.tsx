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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AppContextProvider>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: '#161D2F',
              color: '#fff',
            },
            success: {
              style: {
                backgroundColor: '#161D2F',
                color: '#fff',
              },
            },
            error: {
              style: {
                backgroundColor: '#161D2F',
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
