import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody } from '@chakra-ui/react'
import { Page, PageHeader } from 'components/layouts'
import { ShoesList, ShoesDetailProps } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

const ShoesDetail = dynamic<ShoesDetailProps>(() => import('components/shoes').then(mod => mod.ShoesDetail))

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Page>
      <PageHeader>New Release</PageHeader>
      <ErrorBoundary>
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
    </Page>
  )
}

export default Home
