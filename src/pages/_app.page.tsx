import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

globalStyles()
library.add(fas)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
