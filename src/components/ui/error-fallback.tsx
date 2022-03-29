import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import { Box, Text } from '@chakra-ui/react'
import { NextChakraLink } from 'components/helpers'
import {
  ErrorBoundary as ErrorBoundaryInternal,
  ErrorBoundaryProps as ErrorBoundaryPropsInternal,
  FallbackProps
} from 'react-error-boundary'

type ErrorBoundaryProps = React.PropsWithChildren<Omit<ErrorBoundaryPropsInternal, 'fallback' | 'fallbackRender' | 'FallbackComponent'>>

export function NotFound() {
  return (
    <>
      <Text fontSize="1.25rem" textAlign="center">
        <Trans
          ns="common"
          i18nKey="not-found.message"
          components={{
            link: <NextChakraLink href="/" />
          }}
        />
      </Text>
    </>
  )
}

export function ErrorFallback(props: FallbackProps) {
  const { t } = useTranslation('common')

  return (
    <Box role="alert" textAlign="center">
      {t('error')}: <pre>{props.error.message}</pre>
    </Box>
  )
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryInternal FallbackComponent={ErrorFallback} {...props} />
}
