import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { LinkProps as NextLinkProps } from 'next/dist/client/link'

export type NextChakraLinkProps = React.PropsWithChildren<NextLinkProps & Omit<ChakraLinkProps, 'as'>>

export default function NextChakraLink({ href, as, replace, scroll, shallow, prefetch, children, ...chakraProps }: NextChakraLinkProps) {
  return (
    <NextLink passHref href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} prefetch={prefetch}>
      <ChakraLink {...chakraProps}>{children}</ChakraLink>
    </NextLink>
  )
}
