import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { wrapper } from 'store'
import { shoesApi } from 'services/shoes'
import { Box } from '@chakra-ui/react'
import { ShoesDetail } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
  if (typeof params?.slug === 'string') {
    store.dispatch(shoesApi.endpoints.detailShoes.initiate(params.slug))
  }

  return {
    props: {}
  }
})

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
