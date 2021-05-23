import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { StringOrNumber } from '@chakra-ui/utils'
import { Box, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Image, NumberInput, NumberInputField, CloseButton } from '@chakra-ui/react'
import { NextChakraLink } from 'components/helpers'
import { BagIcon } from 'components/icons'
import { formatCurrency, slugify } from 'utils/misc'
import { remove, setQuantity, selectBagItems, selectBagCount, selectBagTotal } from 'store/bag'

interface InputQuantityProps {
  index: number
  defaultValue: StringOrNumber
}

export function BagIconWithBadge({ isNavigation = false }) {
  const count = useSelector(selectBagCount)

  return (
    <Box display="inline" position="relative" ml={isNavigation ? 0 : 4}>
      <BagIcon aria-label="bag" />

      {count >= 1 && (
        <Box
          position="absolute"
          top={isNavigation ? 0 : '6px'}
          right={isNavigation ? 0 : '12px'}
          background="red.500"
          color="white"
          borderRadius="50%"
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          fontSize=".75rem"
          fontWeight="normal"
          w="1rem"
          h="1rem"
        >
          {count}
        </Box>
      )}
    </Box>
  )
}

export function BagTotal() {
  const total = useSelector(selectBagTotal)

  return (
    <>
      <Text as="span" textTransform="uppercase">
        Total
      </Text>
      <Text as="span">{formatCurrency.format(total)}</Text>
    </>
  )
}

function InputQuantity(props: InputQuantityProps) {
  const dispatch = useDispatch()

  const handleChangeQuantity = (newQuantity: string, index: number) => {
    dispatch(setQuantity({ index, newQuantity }))
  }

  return (
    <NumberInput
      min={1}
      bg="brand.gray"
      borderColor="brand.gray"
      defaultValue={props.defaultValue}
      onChange={value => handleChangeQuantity(value, props.index)}
    >
      <NumberInputField />
    </NumberInput>
  )
}

function BagTablebody() {
  const dispatch = useDispatch()
  const items = useSelector(selectBagItems)

  const handleRemoveItem = (index: number) => {
    dispatch(remove({ index }))
  }

  if (items.length < 1) {
    return (
      <Tbody>
        <Tr>
          <Td colSpan={4} textAlign="center">
            Your bag is empty. Check the {` `}
            <NextChakraLink href="/" fontWeight={500}>
              available shoes
            </NextChakraLink>
          </Td>
        </Tr>
      </Tbody>
    )
  }

  return (
    <Tbody>
      {items.map((item, i) => (
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

              <Image w="150px" h="150px" d={['none', null, 'initial']} alt={item.name} src={`/images/shoes/image-5.jpg`} bg="brand.gray" />

              <NextChakraLink
                href={slugify(item.name)}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                ml={2}
                _hover={{ textDecoration: 'none' }}
              >
                <Text as="span" w="full" fontWeight={600}>
                  {item.name}
                </Text>
                <Flex flexDirection={['column', 'row']} w="full">
                  <Text as="span">Size: {item.selectedSize}</Text>
                  <Text as="span" ml={[0, '20px']}>
                    Color
                    <Box display="inline-block" w={3} h={3} ml="10px" bg={item.selectedColor} />
                  </Text>
                </Flex>
              </NextChakraLink>
            </Flex>
          </Td>
          <Td fontSize="18px" fontWeight={400}>
            {formatCurrency.format(item.price)}
          </Td>
          <Td fontSize="18px">
            <InputQuantity index={i} defaultValue={item.quantity} />
          </Td>
          <Td fontSize="18px">{formatCurrency.format(item.price * item.quantity)}</Td>
        </Tr>
      ))}
    </Tbody>
  )
}

export function BagTable() {
  return (
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
        <BagTablebody />
      </Table>
    </Box>
  )
}
