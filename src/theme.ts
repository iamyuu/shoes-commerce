import { extendTheme } from '@chakra-ui/react'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
}

const fonts = {
  body: `'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
  get heading() {
    return this.body
  }
}

const colors = {
  brand: {
    black: '#131212'
  }
}

export default extendTheme({
  config,
  fonts,
  colors
})
