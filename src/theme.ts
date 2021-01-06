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

export default extendTheme({
  config,
  fonts
})
