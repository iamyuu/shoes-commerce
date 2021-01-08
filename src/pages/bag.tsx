import * as React from 'react'
import { NextPage } from 'next'
import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  NumberInput,
  NumberInputField,
  CloseButton,
  useToast
} from '@chakra-ui/react'
import { NextChakraLink } from 'components/helpers'
import { Page, PageHeader } from 'components/layouts'
import { BagIcon, ArrowLongRightIcon } from 'components/icons'
import { formatCurrency } from 'utils/misc'

const dummyItems = [
  {
    image: '/images/shoes/image-1.jpg',
    name: 'Nike Air Edge 270',
    selectedSize: '8',
    selectedColor: '#6389CB',
    price: 10,
    quantity: 1
  },
  {
    image: '/images/shoes/image-1.jpg',
    name: 'Nike Air Edge 270',
    selectedSize: '8',
    selectedColor: '#6389CB',
    price: 20,
    quantity: 2
  },
  {
    image: '/images/shoes/image-1.jpg',
    name: 'Nike Air Edge 270',
    selectedSize: '8',
    selectedColor: '#6389CB',
    price: 30,
    quantity: 1
  }
]

const countTotal = (items: typeof dummyItems) => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)

const Bag: NextPage = () => {
  const toast = useToast()
  // TODO: get from storage
  const [items, setItems] = React.useState(() => dummyItems)

  const handleRemoveItem = (index: number) => {
    // TODO: remove item
    console.log(`TCL ~ file: bag.tsx ~ line 58 ~ handleRemoveItem ~ index`, index)
  }

  const handleChangeQuantity = (value: string, index: number) => {
    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: parseInt(value, 10)
    }

    setItems(updatedItems)
  }

  const handlePay = () => {
    toast({
      duration: 3000,
      status: 'info',
      description: 'This feature not available yet'
    })
  }

  return (
    <Page>
      <PageHeader>
        Your Bag
        <Box d="inline" ml={4} position="relative">
          <BagIcon />
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
            1
          </Box>
        </Box>
      </PageHeader>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead bg="brand.gray">
            <Tr>
              <Th fontWeight={500} minW="15rem" textAlign="center">
                Product
              </Th>
              <Th fontWeight={500} w="10%">
                Price
              </Th>
              <Th fontWeight={500} w="10%">
                Quantity
              </Th>
              <Th fontWeight={500} w="10%">
                Total
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.length > 0 ? (
              items.map((item, i) => (
                <Tr key={i}>
                  <Td>
                    <Flex fontSize="16px">
                      <Flex alignItems="center" mr={[0, null, 8, 12]}>
                        <CloseButton
                          size="sm"
                          borderRadius="50%"
                          bg="black"
                          color="white"
                          _hover={{ color: 'black', bg: 'brand.gray' }}
                          onClick={() => handleRemoveItem(i)}
                        />
                      </Flex>

                      <Image src={item.image} alt={item.name} w="150px" h="150px" d={['none', null, 'initial']} />

                      <Flex flexDirection="column" justifyContent="center" alignItems="center" ml={2}>
                        <Text as="span" fontWeight={600}>
                          {item.name}
                        </Text>
                        <Flex flexDirection={['column', 'row']} w="full">
                          <Text as="span">Size: {item.selectedSize}</Text>
                          <Text as="span" ml={[0, '20px']}>
                            Color
                            <Box display="inline-block" w={3} h={3} ml="10px" bg={item.selectedColor} />
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td fontSize="18px" fontWeight={400}>
                    {formatCurrency.format(item.price)}
                  </Td>
                  <Td fontSize="18px">
                    <NumberInput
                      defaultValue={item.quantity}
                      min={1}
                      bg="brand.gray"
                      borderColor="brand.gray"
                      onChange={value => handleChangeQuantity(value, i)}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td fontSize="18px">{formatCurrency.format(item.price * item.quantity)}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  Your bag is empty. Check the {` `}
                  <NextChakraLink href="/" fontWeight={500}>
                    available shoes
                  </NextChakraLink>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <Flex mt={8} flexDirection="column" alignItems="flex-end">
        <Flex justifyContent="space-between" w={['100%', '40%']} p={4} mb={['10px', '20px']} bg="brand.gray">
          <Text as="span" textTransform="uppercase">
            Total
          </Text>
          <Text as="span">{formatCurrency.format(countTotal(items))}</Text>
        </Flex>

        <Button justifyContent="space-between" w={['100%', '40%']} isDisabled={items.length < 1} onClick={handlePay}>
          <Text as="span" textTransform="uppercase">
            Pay Now
          </Text>
          <ArrowLongRightIcon position="relative" top="20%" fontSize="1.75rem" />
        </Button>
      </Flex>
    </Page>
  )
}

export default Bag
