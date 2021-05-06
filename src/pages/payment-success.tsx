import { NextPage } from 'next'
import { Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Page, PageHeader } from 'components/layouts'

const PaymentSuccess: NextPage = () => (
  <Page>
    <PageHeader>
      Success <CheckCircleIcon fontSize="2rem" />
    </PageHeader>

    <Text fontSize="1.25rem" textAlign="center">
      Thank you for purchasing, the items will be shipping to your address immediately
    </Text>
  </Page>
)

export default PaymentSuccess
