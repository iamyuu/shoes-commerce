import 'nprogress/nprogress.css'

import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { store, persistor, wrapper } from 'store'
import { useNProgress, usePersistLocaleCookie } from 'utils/hooks'
import createEmotionCache from 'utils/emotion-cache'
import theme from 'theme'

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache
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

function CustomApp({ Component, pageProps, router, emotionCache = clientSideEmotionCache }: CustomAppProps) {
  useNProgress()
  usePersistLocaleCookie()

  return (
    <CacheProvider value={emotionCache}>
      <AllProvider>
        <DefaultSeo title="Shoes Commerce" canonical={router.asPath} />
        <Component {...pageProps} />
      </AllProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(CustomApp)
