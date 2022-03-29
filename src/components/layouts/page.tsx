import { Container, Flex } from '@chakra-ui/react'
import Navigation from './navigation'

export interface PageProps {
  children: React.ReactNode
}

export default function Page({ children }: PageProps) {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navigation />
      <Container as="main" flex="1 1 auto" maxWidth="var(--max-w-container)" mb={[6, null, null, 9]}>
        {children}
      </Container>
    </Flex>
  )
}
