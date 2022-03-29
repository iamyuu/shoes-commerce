const ButtonComponents = {
  baseStyle: {
    fontWeight: 600,
    fontSize: '1rem',
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

export const components = {
  Button: ButtonComponents
}
