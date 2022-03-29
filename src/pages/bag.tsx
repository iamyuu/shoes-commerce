import * as React from 'react'
import { NextSeo } from 'next-seo'
import { Flex, Text, Button, useToast } from '@chakra-ui/react'
import { BagTable, BagTotal, BagIconWithBadge } from 'components/bag'
import { Page, PageHeader } from 'components/layouts'
import { ErrorBoundary } from 'components/ui/error-fallback'
import { ArrowLongRightIcon } from 'components/icons'
import { loadStripe } from '@stripe/stripe-js'
import { client } from 'utils/api-client'
import { selectBagItems } from 'store/bag'
import { useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

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

      const stripe = await stripePromise

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
        <Flex justifyContent="space-between" w={['100%', '40%']} p={4} mb={['10px', '20px']} bg="brand.gray">
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
      <NextSeo title={t('title')} />

      <PageHeader>
        {t('title')}
        <BagIconWithBadge />
      </PageHeader>

      {page}
    </Page>
  )
}
