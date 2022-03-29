import 'styles/global.css'
import 'nprogress/nprogress.css'

import { useEffect, ReactNode } from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NProgress from 'nprogress'
import { Page } from 'components/layouts'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { store, persistor, wrapper } from 'store'
import createEmotionCache from 'utils/emotion-cache'
import theme from 'theme'

const progress = NProgress.configure({
  showSpinner: false
})

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: AppProps['Component'] & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

// client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export const AllProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </PersistGate>
  </Provider>
)

const defaultGetLayout = (page: ReactNode): ReactNode => <Page>{page}</Page>

function CustomApp({ Component, pageProps, router, emotionCache = clientSideEmotionCache }: CustomAppProps) {
  const getLayout = Component.getLayout || defaultGetLayout

  useEffect(() => {
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

  useEffect(() => {
    if (router.locale !== router.defaultLocale) {
      const date = new Date()
      const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
      date.setTime(date.getTime() + expireMs)
      document.cookie = `NEXT_LOCALE=${router.locale};expires=${date.toUTCString()};path=/`
    }
  }, [router.locale, router.defaultLocale])

  return (
    <CacheProvider value={emotionCache}>
      <AllProvider>
        <DefaultSeo title="Shoes Commerce" canonical={router.asPath} />
        {getLayout(<Component {...pageProps} />)}
      </AllProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(CustomApp)
