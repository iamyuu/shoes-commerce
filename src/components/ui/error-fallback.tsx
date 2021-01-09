import { Box, Text } from '@chakra-ui/react'
import { NextChakraLink } from 'components/helpers'
import { ErrorBoundary as ErrorBoundaryInternal, FallbackProps } from 'react-error-boundary'

export function NotFound() {
  return (
    <>
      <Text fontSize="1.25rem" textAlign="center">
        Sorry... nothing here. {` `}
        <NextChakraLink href="/">Go home</NextChakraLink>
      </Text>
    </>
  )
}

export function ErrorFallback(props: FallbackProps) {
  return (
    <Box role="alert" textAlign="center">
      There was an error: <pre>{props.error.message}</pre>
    </Box>
  )
}

export function ErrorBoundary(props) {
  return <ErrorBoundaryInternal FallbackComponent={ErrorFallback} {...props} />
}
