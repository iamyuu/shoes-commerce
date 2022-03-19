import * as React from 'react'
import { useRouter } from 'next/router'

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
