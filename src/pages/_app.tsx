import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'
import { store, persistor, wrapper } from 'store'
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

function CustomApp({ Component, pageProps, router }: AppProps) {
  return (
    <AllProvider>
      <DefaultSeo title="Shoes Commerce" canonical={router.asPath} />
      <Component {...pageProps} />
    </AllProvider>
  )
}

export default wrapper.withRedux(CustomApp)
