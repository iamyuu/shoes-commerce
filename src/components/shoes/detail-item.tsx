import * as React from 'react'
import { useDispatch } from 'react-redux'
import {
  useToast,
  useDisclosure,
  useRadioGroup,
  HStack,
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  AspectRatio,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Skeleton,
  SkeletonCircle
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { Radio, RadioButton } from 'components/ui/radio'
import { PlayIcon, DeliveryIcon, ArrowLongRightIcon } from 'components/icons'
import { formatCurrency } from 'utils/misc'
import { useDetailShoesQuery, Color } from 'services/shoes'
import { addOrUpdate } from 'store/bag'

export interface ShoesDetailProps {
  slug?: string
}

interface PlayVideoProps {
  title?: string
  source?: string
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

function PlayVideo(props: PlayVideoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex
        direction="row"
        mx={['auto', null, 0]}
        cursor={props?.source ? 'pointer' : 'default'}
        onClick={props?.source ? onOpen : undefined}
      >
        <Box w="4rem" borderRadius="50%" bgColor="rgba(19, 18, 18, 0.05)">
          <PlayIcon position="relative" left={2} top={1} m={4} fontSize="2rem" color="brand.black" />
        </Box>

        <Text ml={4} display="flex" alignItems="center" fontSize="20px" fontWeight="400">
          Play Video
        </Text>
      </Flex>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AspectRatio maxW="560px" ratio={1}>
              <iframe title={props?.title} src={props?.source} />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function ChooseColor(props: ChooseColorProps) {
  const { getRootProps, getRadioProps } = useRadioGroup()

  return (
    <HStack {...getRootProps()}>
      {props.colors.map(value => {
        const radio = getRadioProps({ value: value.color_hash })

        return (
          <Radio
            id="choose-color"
            isRounded
            borderWidth={3}
            key={value.color_hash}
            bg={value.color_hash}
            _checked={{ bg: value.color_hash }}
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
        title: 'Oops',
        description: 'You need choose color and size first'
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
        title: 'Success',
        description: 'Added to bag'
      })
    }
  }

  return (
    <form onSubmit={handleAddToBag} noValidate>
      <Flex direction={['column', null, null, 'row']}>
        <Box>
          <Skeleton isLoaded={!isLoading}>
            <Image alt={shoes?.name} src="/images/shoes/image-detail-large.jpg" objectFit="cover" mx="auto" />
          </Skeleton>

          <SimpleGrid minChildWidth={['50px', '100px']} spacing="20px" mt={['20px', null, '40px', '20px']} mb="40px">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} isLoaded={!isLoading}>
                <AspectRatio ratio={4 / 3}>
                  <Image src={`/images/shoes/image-detail-${i + 1}.jpg`} alt={`${shoes?.name} image ${i}`} />
                </AspectRatio>
              </Skeleton>
            ))}
          </SimpleGrid>
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
              {shoes?.category}
            </Text>
          </Skeleton>

          <Skeleton isLoaded={!isLoading} my={2}>
            <Heading aria-label="shoes name" as="h1" fontSize="50px" fontWeight="bold">
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

          <Box mt="20px" mb="38px">
            {!isLoading && <PlayVideo title={shoes?.name} source={shoes?.video} />}
          </Box>

          <Text color="brand.black" fontSize="18px" mb="20px">
            Select Size (US)
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
            Select Color
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

      <Flex direction="row" flexWrap="wrap" alignItems="center" bg="brand.gray" p={['.5rem', '.75rem', '1rem']} mt="40px">
        <Flex justifyContent={['center', null, 'start']} alignItems="center" flexGrow={1} mb={['1rem', null, 0]}>
          <DeliveryIcon w="20px" h="20px" position="relative" top="2px" mr="10px" />
          <Text as="span" textTransform="uppercase" fontSize="12px" fontWeight={400}>
            free shipping over $100 purchase
          </Text>
        </Flex>

        <Button type="submit" isDisabled={isLoading} w={['full', null, 'initial']}>
          add to bag — {shoes ? formatCurrency.format(shoes.price) : '-'}
          <ArrowLongRightIcon ml={6} fontSize="2rem" position="relative" top="25%" />
        </Button>
      </Flex>
    </form>
  )
}
