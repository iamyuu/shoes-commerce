import * as React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useDispatch } from 'react-redux'
import { useToast, useRadioGroup, HStack, Stack, Box, Flex, Heading, Text, Button, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { Radio, RadioButton } from 'components/ui/radio'
import { ArrowLongRightIcon } from 'components/icons'
import { ProductImage } from './product-image'
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
      <Flex direction={['column', null, null, 'row']} justify="center" mb={10}>
        <Box width="350px" height="350px" bg="brand.gray" pos="relative" top="4.5rem">
          <ProductImage alt={shoes?.name} src={shoes?.image} objectFit="contain" />
        </Box>

        <Stack
          spacing={8}
          direction="column"
          textTransform="uppercase"
          pt={[0, '2.5rem']}
          px={[0, null, '2.5rem', '5.5rem']}
          w={['full', null, null, null, '50%']}
          maxW={['full', null, null, '640px']}
        >
          <section id="information">
            <Skeleton isLoaded={!isLoading} w={['40%', '25%']}>
              <Text aria-label="shoes category" as="small" fontSize="1rem" fontWeight="400">
                {shoes?.brand}
              </Text>
            </Skeleton>

            <Skeleton isLoaded={!isLoading} my={2}>
              <Heading aria-label="shoes name" as="h1" fontSize="2.25rem" fontWeight="bold">
                {shoes?.name}
              </Heading>
            </Skeleton>

            {isLoading ? (
              <>
                <Skeleton h="1rem" mb={2} />
                <Skeleton h="1rem" mb={2} />
                <Skeleton h="1rem" w="80%" />
              </>
            ) : (
              <Text aria-label="shoes description" textTransform="initial" fontSize="1rem" fontWeight="400">
                {shoes?.description}
              </Text>
            )}
          </section>

          <Stack id="choose size" as="section" spacing={3}>
            <Text color="brand.black" fontSize="1rem" textTransform="capitalize">
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
          </Stack>

          <Stack id="choose color" as="section" spacing={3}>
            <Text color="brand.black" fontSize="1rem">
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
          </Stack>
        </Stack>
      </Flex>

      <Button type="submit" isDisabled={isLoading} w={['full', null, 'initial']} float="right">
        {t('add-to-bag')} {shoes ? `— ${formatCurrency(shoes.price)}` : ''}
        <ArrowLongRightIcon ml={6} fontSize="2rem" position="relative" top="25%" />
      </Button>
    </form>
  )
}
