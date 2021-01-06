import { SWRConfig } from 'swr'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import client from 'utils/api-client'
import theme from 'theme'
import 'typeface-poppins'

const swrConfig = {
  fetcher: (endpoint, init) => client(endpoint, init)
}

export const AllProvider: React.FC = ({ children }) => (
  <SWRConfig value={swrConfig}>
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  </SWRConfig>
)

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <AllProvider>
      <Component {...pageProps} />
    </AllProvider>
  )
}
