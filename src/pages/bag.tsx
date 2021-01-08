import * as React from 'react'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Flex, Text, Button, useToast } from '@chakra-ui/react'
import { BagTable, Total } from 'components/bag'
import { Page, PageHeader } from 'components/layouts'
import { ArrowLongRightIcon, BagIcon } from 'components/icons'
import { selectBagCount } from 'store/bag'

function BagIconWithBadge() {
  const count = useSelector(selectBagCount)

  return (
    <Box display="inline" position="relative" ml={4}>
      <BagIcon />

      {count >= 1 && (
        <Box
          position="absolute"
          top="5px"
          right="10px"
          background="red.500"
          color="white"
          borderRadius="50%"
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          fontSize=".5rem"
          w="1rem"
          h="1rem"
        >
          {count}
        </Box>
      )}
    </Box>
  )
}

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

      <BagTable />

      <Flex mt={8} flexDirection="column" alignItems="flex-end">
        <Flex justifyContent="space-between" w={['100%', '40%']} p={4} mb={['10px', '20px']} bg="brand.gray">
          <Total />
        </Flex>

        <Button justifyContent="space-between" w={['100%', '40%']} onClick={handlePay}>
          <Text as="span" textTransform="uppercase">
            Pay Now
          </Text>
          <ArrowLongRightIcon position="relative" top="20%" fontSize="1.75rem" />
        </Button>
      </Flex>
    </Page>
  )
}

export default BagPage
