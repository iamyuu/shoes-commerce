import * as React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Flex, Text, Button, useToast } from '@chakra-ui/react'
import { BagTable, BagTotal, BagIconWithBadge } from 'components/bag'
import { Page, PageHeader } from 'components/layouts'
import { ErrorBoundary } from 'components/ui/error-fallback'
import { ArrowLongRightIcon } from 'components/icons'
import { redirectToCheckout } from 'services/stripe'
import { selectBagItems } from 'store/bag'
import { useSelector } from 'react-redux'

function ButtonPay() {
  const items = useSelector(selectBagItems)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const toast = useToast({ duration: 5000, isClosable: true, position: 'bottom' })

  async function handlePay() {
    try {
      setIsSubmitting(true)
      toast.closeAll()

      await redirectToCheckout(items)
    } catch (error) {
      toast({
        status: 'error',
        title: 'Oops',
        description: error.message
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button justifyContent="space-between" w={['100%', '40%']} loadingText="Processing" isLoading={isSubmitting} onClick={handlePay}>
      <Text as="span" textTransform="uppercase">
        Pay Now
      </Text>
      <ArrowLongRightIcon position="relative" top="20%" fontSize="1.75rem" />
    </Button>
  )
}

const BagPage: NextPage = () => {
  return (
    <Page>
      <NextSeo title="Your Bag" />

      <PageHeader>
        Your Bag
        <BagIconWithBadge />
      </PageHeader>

      <ErrorBoundary>
        <BagTable />

        <Flex mt={8} flexDirection="column" alignItems="flex-end">
          <Flex justifyContent="space-between" w={['100%', '40%']} p={4} mb={['10px', '20px']} bg="brand.gray">
            <BagTotal />
          </Flex>

          <ButtonPay />
        </Flex>
      </ErrorBoundary>
    </Page>
  )
}

export default BagPage
