import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { ShoesDetail } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

export default function DetailShoesPage() {
  const router = useRouter()

  return (
    <Box pt={[0, '2.5rem']}>
      <ErrorBoundary resetKeys={[router.query.shoes]}>
        <ShoesDetail slug={router.isReady ? (router.query.slug as string) : undefined} />
      </ErrorBoundary>
    </Box>
  )
}
