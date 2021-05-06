import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import GoogleFonts from 'next-google-fonts'
import { SWRConfig } from 'swr'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { client } from 'utils/api-client'
import store from 'store'
import theme from 'theme'

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
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />

      <Component {...pageProps} />
    </AllProvider>
  )
}
