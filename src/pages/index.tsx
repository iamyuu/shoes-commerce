import dynamic from 'next/dynamic'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { wrapper } from 'store'
import { shoesApi } from 'services/shoes'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody } from '@chakra-ui/react'
import { Page, PageHeader } from 'components/layouts'
import { ShoesList, ShoesDetailProps } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

const ShoesDetail = dynamic<ShoesDetailProps>(() => import('components/shoes').then(mod => mod.ShoesDetail))

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  store.dispatch(shoesApi.endpoints.allShoes.initiate())

  return {
    props: {}
  }
})

export default function NewReleasePage() {
  const router = useRouter()

  return (
    <ErrorBoundary resetKeys={[router.query.shoes]}>
      <ShoesList />
      <Modal isOpen={!!router.query.shoes} onClose={() => router.push('/')}>
        <ModalOverlay />
        <ModalContent maxW="65rem">
          <ModalHeader>&nbsp;</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ShoesDetail slug={router.query.shoes as string} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ErrorBoundary>
  )
}

NewReleasePage.getLayout = function NewReleaseLayout(page: React.ReactNode) {
  const { t } = useTranslation('new-release')

  return (
    <Page>
      <PageHeader>{t('title')}</PageHeader>

      {page}
    </Page>
  )
}
