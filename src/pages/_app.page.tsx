import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { SessionProvider } from 'next-auth/react'

globalStyles()
library.add(fas)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
