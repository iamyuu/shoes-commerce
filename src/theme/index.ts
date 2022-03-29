import type { ThemeConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { components } from './components'

const config: ThemeConfig = {
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
    black: 'var(--colors-brand-black)',
    gray: 'var(--colors-brand-gray)'
  }
}

const shadows = {
  outline: `0 0 0 1px ${colors.brand.black}`
}

export default extendTheme({
  config,
  fonts,
  colors,
  shadows,
  components
})
