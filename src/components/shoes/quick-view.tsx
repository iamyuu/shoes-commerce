import { useRouter } from 'next/router'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody } from '@chakra-ui/react'
import { ShoesDetail } from 'components/shoes'

export function QuickView() {
  const router = useRouter()

  return (
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
  )
}
