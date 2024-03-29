import * as React from 'react'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { useDispatch, useSelector } from 'react-redux'
import type { StringOrNumber } from '@chakra-ui/utils'
import { Box, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Skeleton, NumberInput, NumberInputField, CloseButton } from '@chakra-ui/react'
import { NextChakraLink } from 'components/helpers'
import { ProductImage } from 'components/shoes'
import { BagIcon } from 'components/icons'
import { formatCurrency } from 'utils/misc'
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
          top={isNavigation ? 0 : 1.5}
          right={isNavigation ? 0 : 3}
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
  const { t } = useTranslation('bag')
  const total = useSelector(selectBagTotal)

  return (
    <>
      <Text as="span" textTransform="uppercase">
        {t('total')}
      </Text>
      <Text as="span">{formatCurrency(total)}</Text>
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
      focusBorderColor="black"
      defaultValue={props.defaultValue}
      onChange={value => handleChangeQuantity(value, props.index)}
    >
      <NumberInputField />
    </NumberInput>
  )
}

function BagTablebody() {
  const { t } = useTranslation('bag')
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
            <Trans
              ns="bag"
              i18nKey="empty-state"
              components={{
                link: <NextChakraLink href="/" fontWeight={500} />
              }}
            />
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
            <Flex fontSize="1rem">
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

              <Box w="150px" h="150px" d={['none', null, 'initial']} bg="brand.gray">
                <ProductImage alt={item.name} src={item.image} />
              </Box>

              <Flex flexDirection="column" justifyContent="center" alignItems="center" ml={2}>
                <NextChakraLink href={`/shoes/${item.id}`} w="full" fontWeight={600}>
                  {item.name}
                </NextChakraLink>
                <Flex flexDirection={['column', 'row']} w="full">
                  <Text as="span">
                    {t('size')}: {item.selectedSize}
                  </Text>
                  <Text as="span" ml={[0, 5]}>
                    {t('color')}:
                    <Box display="inline-block" w={3} h={3} ml={2.5} bg={item.selectedColor} />
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Td>
          <Td fontSize="1rem" fontWeight={400}>
            {formatCurrency(item.price)}
          </Td>
          <Td fontSize="1rem">
            <InputQuantity index={i} defaultValue={item.quantity} />
          </Td>
          <Td fontSize="1rem">{formatCurrency(item.price * item.quantity)}</Td>
        </Tr>
      ))}
    </Tbody>
  )
}

export function BagTable() {
  const { t } = useTranslation('bag')

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead bg="brand.gray">
          <Tr>
            <Th fontWeight={500} minW="15rem" textAlign="center">
              {t('product')}
            </Th>
            <Th fontWeight={500} w="10%">
              {t('price')}
            </Th>
            <Th fontWeight={500} w="10%">
              {t('quantity')}
            </Th>
            <Th fontWeight={500} w="10%">
              {t('total')}
            </Th>
          </Tr>
        </Thead>
        <BagTablebody />
      </Table>
    </Box>
  )
}
