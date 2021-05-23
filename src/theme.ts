import { extendTheme } from '@chakra-ui/react'
import type { ThemeConfig } from '@chakra-ui/react'

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
    black: '#131212',
    gray: '#f6f6f6'
  }
}

const ButtonComponents = {
  baseStyle: {
    fontWeight: 600,
    fontSize: '16px',
    textTransform: 'uppercase'
  },
  variants: {
    black: () => {
      const hoverColor = { color: 'black', bg: 'brand.gray' }

      return {
        bg: 'black',
        color: 'white',
        _hover: hoverColor,
        _focus: hoverColor
      }
    }
  },
  defaultProps: {
    variant: 'black'
  }
}

const components = {
  Button: ButtonComponents
}

export default extendTheme({
  config,
  fonts,
  colors,
  components
})
