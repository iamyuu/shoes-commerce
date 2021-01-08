import { DefaultSeo } from 'next-seo'
import { SWRConfig } from 'swr'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import client from 'utils/api-client'
import store from 'store'
import theme from 'theme'
import 'typeface-poppins'

const swrConfig = {
  fetcher: (endpoint, init) => client(endpoint, init)
}

export const AllProvider: React.FC = ({ children }) => (
  <Provider store={store}>
    <SWRConfig value={swrConfig}>
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </SWRConfig>
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
