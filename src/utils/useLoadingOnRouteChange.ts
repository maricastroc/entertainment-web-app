import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

export const useLoadingOnRouteChange = () => {
  const router = useRouter()

  const [isRouteLoading, setIsRouteLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsRouteLoading(true)
    const handleComplete = () => setIsRouteLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])

  return isRouteLoading
}
