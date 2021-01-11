import * as React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Flex, Text, Button, useToast } from '@chakra-ui/react'
import { BagTable, BagTotal, BagIconWithBadge } from 'components/bag'
import { Page, PageHeader } from 'components/layouts'
import { ErrorBoundary } from 'components/ui/error-fallback'
import { ArrowLongRightIcon } from 'components/icons'

const BagPage: NextPage = () => {
  const toast = useToast()

  const handlePay = () => {
    toast({
      duration: 3000,
      status: 'info',
      description: 'This feature not available yet'
    })
  }

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

          <Button justifyContent="space-between" w={['100%', '40%']} onClick={handlePay}>
            <Text as="span" textTransform="uppercase">
              Pay Now
            </Text>
            <ArrowLongRightIcon position="relative" top="20%" fontSize="1.75rem" />
          </Button>
        </Flex>
      </ErrorBoundary>
    </Page>
  )
}

export default BagPage
