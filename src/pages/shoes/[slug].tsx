import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { Page } from 'components/layouts'
import { ShoesDetail } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

const Detail: NextPage = () => {
  const router = useRouter()

  return (
    <Page>
      <Box pt={[0, '2.5rem']}>
        <ErrorBoundary resetKeys={[router.query.shoes]}>
          <ShoesDetail slug={router.isReady ? (router.query.slug as string) : undefined} />
        </ErrorBoundary>
      </Box>
    </Page>
  )
}

export default Detail
