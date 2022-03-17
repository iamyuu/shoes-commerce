import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'
import { store, persistor } from 'store'
import theme from 'theme'

export const AllProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </PersistGate>
  </Provider>
)

export default function CustomApp({ Component, pageProps, router }: AppProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''

  return (
    <AllProvider>
      <DefaultSeo title="Shoes Commerce" canonical={baseUrl + router.asPath || ''} />

      <Component {...pageProps} />
    </AllProvider>
  )
}
