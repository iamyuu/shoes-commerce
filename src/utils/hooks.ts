import * as React from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

const progress = NProgress.configure({
  showSpinner: false
})

export function useNProgress() {
  const router = useRouter()

  React.useEffect(() => {
    const handleStart = (_type: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) {
        progress.start()
      }
    }
    const handleStop = () => {
      progress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
}

export function usePersistLocaleCookie() {
  const { locale, defaultLocale } = useRouter()

  React.useEffect(() => {
    if (locale !== defaultLocale) {
      const date = new Date()
      const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
      date.setTime(date.getTime() + expireMs)
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
    }
  }, [locale, defaultLocale])
}
