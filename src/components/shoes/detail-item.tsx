import * as React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useDispatch } from 'react-redux'
import { useToast, useRadioGroup, HStack, Box, Flex, Heading, Text, Image, Button, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { Radio, RadioButton } from 'components/ui/radio'
import { ArrowLongRightIcon } from 'components/icons'
import { formatCurrency } from 'utils/misc'
import { useDetailShoesQuery, Color } from 'services/shoes'
import { addOrUpdate } from 'store/bag'

export interface ShoesDetailProps {
  slug?: string
}

interface ChooseColorProps {
  colors: Color[]
}

interface FormElements extends HTMLFormControlsCollection {
  'choose-color': HTMLInputElement
  'choose-size': HTMLInputElement
}
interface AddToBagFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

function ChooseColor(props: ChooseColorProps) {
  const { getRootProps, getRadioProps } = useRadioGroup()

  return (
    <HStack {...getRootProps()}>
      {props.colors.map(value => {
        const radio = getRadioProps({ value: value.colorHash })

        return (
          <Radio
            id="choose-color"
            isRounded
            borderWidth={3}
            key={value.colorHash}
            bg={value.colorHash}
            _checked={{ bg: value.colorHash }}
            {...radio}
          >
            {radio.isChecked ? <CheckIcon color="white" /> : null}
          </Radio>
        )
      })}
    </HStack>
  )
}

export function ShoesDetail(props: ShoesDetailProps) {
  const dispatch = useDispatch()
  const { t } = useTranslation('detail')
  const { data: shoes, isLoading, error } = useDetailShoesQuery(props?.slug ?? '')
  const toast = useToast({ duration: 5000, isClosable: true, position: 'bottom' })

  if (error) {
    throw error
  }

  function handleAddToBag(event: React.FormEvent<AddToBagFormElement>) {
    event.preventDefault()
    toast.closeAll()

    const { 'choose-color': chooseColor, 'choose-size': chooseSize } = event.currentTarget.elements

    if (!chooseColor.value || !chooseSize.value) {
      toast({
        status: 'warning',
        title: t('message.warning.title'),
        description: t('message.warning.description')
      })

      return
    }

    if (shoes) {
      const newItem = {
        ...shoes,
        quantity: 1,
        selectedSize: chooseSize.value,
        selectedColor: chooseColor.value
      }

      dispatch(addOrUpdate({ newItem }))

      toast({
        status: 'success',
        title: t('message.success.title'),
        description: t('message.success.description')
      })
    }
  }

  return (
    <form onSubmit={handleAddToBag} noValidate>
      <Flex direction={['column', null, null, 'row']}>
        <Box>
          <Skeleton isLoaded={!isLoading}>
            <Image alt={shoes?.name} src={shoes?.image.original} objectFit="cover" mx="auto" />
          </Skeleton>
        </Box>

        <Flex
          direction="column"
          textTransform="uppercase"
          pt={['0px', '2.5rem']}
          px={[0, null, '2.5rem', '5.5rem']}
          w={['full', null, null, null, '50%']}
          maxW={['full', null, null, '640px']}
        >
          <Skeleton isLoaded={!isLoading} w={['40%', '25%']}>
            <Text aria-label="shoes category" as="small" fontSize="16px" fontWeight="400">
              {shoes?.brand}
            </Text>
          </Skeleton>

          <Skeleton isLoaded={!isLoading} my={2}>
            <Heading aria-label="shoes name" as="h1" fontSize="36px" fontWeight="bold">
              {shoes?.name}
            </Heading>
          </Skeleton>

          {isLoading ? (
            <>
              <Skeleton h="18px" mb={2} />
              <Skeleton h="18px" mb={2} />
              <Skeleton h="18px" w="80%" />
            </>
          ) : (
            <Text aria-label="shoes description" textTransform="initial" fontSize="18px" fontWeight="400">
              {shoes?.description}
            </Text>
          )}

          <Text color="brand.black" fontSize="18px" mb="20px" textTransform="capitalize">
            {t('choose-size')} (US)
          </Text>

          {isLoading ? (
            <Flex direction="row">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} mx={1} w="50px" h="50px" />
              ))}
            </Flex>
          ) : (
            <RadioButton name="choose-size" options={shoes?.sizes ?? []} borderWidth="1px" />
          )}

          <Text color="brand.black" fontSize="18px" mb="20px" mt="40px">
            {t('choose-color')}
          </Text>

          {isLoading ? (
            <Flex direction="row">
              {[...Array(5)].map((_, i) => (
                <SkeletonCircle key={i} mx={1} size="12" />
              ))}
            </Flex>
          ) : (
            <ChooseColor colors={shoes?.colors ?? []} />
          )}
        </Flex>
      </Flex>

      <Button type="submit" isDisabled={isLoading} w={['full', null, 'initial']} float="right" mt="40px">
        {t('add-to-bag')} — {shoes ? formatCurrency.format(shoes.price) : '-'}
        <ArrowLongRightIcon ml={6} fontSize="2rem" position="relative" top="25%" />
      </Button>
    </form>
  )
}
