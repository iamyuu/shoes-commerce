import * as React from 'react'
import { Flex, Text, Button, useToast } from '@chakra-ui/react'
import { BagTable, BagTotal, BagIconWithBadge } from 'components/bag'
import { Page, PageHeader } from 'components/layouts'
import { ErrorBoundary } from 'components/ui/error-fallback'
import { ArrowLongRightIcon } from 'components/icons'
import { getStripe } from 'utils/get-stripe'
import { client } from 'utils/api-client'
import { selectBagItems } from 'store/bag'
import { useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

function ButtonPay() {
  const { t } = useTranslation('bag')
  const items = useSelector(selectBagItems)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const toast = useToast({ duration: 5000, isClosable: true, position: 'bottom' })

  async function handlePay() {
    try {
      setIsSubmitting(true)
      toast.closeAll()

      const { sessionId } = await client('/create-checkout-session', {
        data: { items }
      })

      const stripe = await getStripe()

      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId })

        if (result.error) {
          throw result.error
        }
      }
    } catch (error) {
      toast({
        status: 'error',
        title: 'Oops',
        description: (error as Error).message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      justifyContent="space-between"
      w={['100%', '40%']}
      loadingText="Processing"
      isLoading={isSubmitting}
      isDisabled={items.length < 1}
      onClick={handlePay}
    >
      <Text as="span" textTransform="uppercase">
        {t('pay-now')}
      </Text>
      <ArrowLongRightIcon position="relative" top="20%" fontSize="1.75rem" />
    </Button>
  )
}

export default function BagPage() {
  return (
    <ErrorBoundary>
      <BagTable />

      <Flex mt={8} flexDirection="column" alignItems="flex-end">
        <Flex justifyContent="space-between" w={['100%', '40%']} p={4} mb={[2.5, 5]} bg="brand.gray">
          <BagTotal />
        </Flex>

        <ButtonPay />
      </Flex>
    </ErrorBoundary>
  )
}

BagPage.getLayout = function BagLayout(page: React.ReactNode) {
  const { t } = useTranslation('bag')

  return (
    <Page>
      <PageHeader>
        {t('title')}
        <BagIconWithBadge />
      </PageHeader>

      {page}
    </Page>
  )
}
