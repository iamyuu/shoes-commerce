import * as React from 'react'
import { useDispatch } from 'react-redux'
import {
  useToast,
  useDisclosure,
  useRadioGroup,
  useTheme,
  useMediaQuery,
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
// import { NotFound } from 'components/ui/error-fallback'
import { Radio, RadioButton } from 'components/ui/radio'
import { PlayIcon, DeliveryIcon, ArrowLongRightIcon } from 'components/icons'
import { formatCurrency } from 'utils/misc'
import { useSingleShoes, Color } from 'services/shoes'
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

function PlayVideo(props: PlayVideoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex direction="row" mx={['auto', null, 0]} cursor={props?.source ? 'pointer' : 'default'} onClick={props?.source ? onOpen : null}>
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
      {props.colors.map(value => (
        <Radio
          id="choose-color"
          isRounded
          borderWidth="5px"
          key={value.color_hash}
          bg={value.color_hash}
          _checked={{ bg: value.color_hash }}
          {...getRadioProps({ value: value.color_hash })}
        />
      ))}
    </HStack>
  )
}

export function ShoesDetail(props: ShoesDetailProps) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { shoes, loading, error } = useSingleShoes(props?.slug)
  const toast = useToast({ duration: 5000, isClosable: true, position: 'bottom' })
  const [isDesktop] = useMediaQuery(`(min-width: ${theme.breakpoints.lg}`)

  if (error) {
    throw error
  }

  function handleAddToBag(event) {
    event.preventDefault()
    toast.closeAll()

    const { 'choose-color': chooseColor, 'choose-size': chooseSize } = event.target.elements

    if (!chooseColor.value || !chooseSize.value) {
      toast({
        status: 'warning',
        title: 'Oops',
        description: 'You need choose color and size first'
      })

      return
    }

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

  return (
    <form onSubmit={handleAddToBag} noValidate>
      <Flex direction={['column', null, null, 'row']}>
        <Box>
          <Skeleton isLoaded={!loading}>
            {isDesktop ? (
              <Image alt={shoes.name} src="/images/shoes/image-detail-large.jpg" objectFit="cover" />
            ) : (
              <AspectRatio ratio={4 / 3} bg="brand.gray">
                <Image alt={shoes.name} src="/images/shoes/image-detail-large.jpg" objectFit="cover" />
              </AspectRatio>
            )}
          </Skeleton>

          <SimpleGrid minChildWidth={['50px', '100px']} spacing="20px" mt={['20px', null, '40px', '20px']} mb="40px">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} isLoaded={!loading}>
                <AspectRatio ratio={4 / 3}>
                  <Image src={`/images/shoes/image-detail-${i + 1}.jpg`} alt={`${shoes.name} image ${i}`} />
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
          <Skeleton isLoaded={!loading} w={['40%', '25%']}>
            <Text aria-label="shoes category" as="small" fontSize="16px" fontWeight="400">
              {shoes.category}
            </Text>
          </Skeleton>

          <Skeleton isLoaded={!loading} my={2}>
            <Heading aria-label="shoes name" as="h1" fontSize="50px" fontWeight="bold">
              {shoes.name}
            </Heading>
          </Skeleton>

          {loading ? (
            <>
              <Skeleton h="18px" mb={2} />
              <Skeleton h="18px" mb={2} />
              <Skeleton h="18px" w="80%" />
            </>
          ) : (
            <Text aria-label="shoes description" textTransform="initial" fontSize="18px" fontWeight="400">
              {shoes.description}
            </Text>
          )}

          <Box mt="20px" mb="38px">
            {!loading && <PlayVideo title={shoes.name} source={shoes.video} />}
          </Box>

          <Text color="brand.black" fontSize="18px" mb="20px">
            Select Size (US)
          </Text>

          {loading ? (
            <Flex direction="row">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} mx={1} w="50px" h="50px" />
              ))}
            </Flex>
          ) : (
            <RadioButton name="choose-size" options={shoes.sizes} borderWidth="1px" />
          )}

          <Text color="brand.black" fontSize="18px" mb="20px" mt="40px">
            Select Color
          </Text>

          {loading ? (
            <Flex direction="row">
              {[...Array(5)].map((_, i) => (
                <SkeletonCircle key={i} mx={1} size="12" />
              ))}
            </Flex>
          ) : (
            <ChooseColor colors={shoes.colors} />
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

        <Button type="submit" isDisabled={loading} w={['full', null, 'initial']}>
          add to bag — {formatCurrency.format(shoes.price)}
          <ArrowLongRightIcon ml={6} fontSize="2rem" position="relative" top="25%" />
        </Button>
      </Flex>
    </form>
  )
}
