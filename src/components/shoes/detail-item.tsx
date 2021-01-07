import * as React from 'react'
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
import { Radio, RadioButton } from 'components/ui/radio'
import { PlayIcon, DeliveryIcon, ArrowLongRightIcon } from 'components/icons'
import { formatCurrency } from 'utils/misc'
import { useSingleShoes, Color } from 'services/shoes'

interface ShoesDetailProps {
  slug: string
}

interface PlayVideoProps {
  title?: string
  source?: string
}

interface ChooseColorProps {
  colors: Color[]
}

interface ButtonSubmitProps {
  price: number
  isLoading?: boolean
}

function PlayVideo(props: PlayVideoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex direction="row" mx={['auto', null, 0]} cursor={props?.source ? 'pointer' : 'default'} onClick={props?.source ? onOpen : null}>
        <Box w="4rem" borderRadius="50%" bgColor="rgba(19, 18, 18, 0.05)">
          <PlayIcon position="relative" left={2} top={1} m={4} fontSize="2rem" color="brand.black" />
        </Box>

        <Text ml={4} display="flex" alignItems="center" fontSize="20px">
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

function ButtonSubmit(props: ButtonSubmitProps) {
  const focusColor = props.isLoading ? {} : { color: 'black', bg: '#F6F6F6' }

  return (
    <Button
      type="submit"
      textTransform="uppercase"
      fontSize="16px"
      fontWeight={700}
      bg="black"
      color="white"
      _hover={focusColor}
      _focus={focusColor}
      isLoading={props.isLoading}
    >
      <Text as="span">add to bag — {formatCurrency.format(props.price)}</Text>
      <ArrowLongRightIcon ml={6} fontSize="2rem" position="relative" top="25%" />
    </Button>
  )
}

export function ShoesDetail(props: ShoesDetailProps) {
  const { shoes, loading } = useSingleShoes(props.slug)
  const toast = useToast({ duration: 5000, isClosable: true })

  function handleAddToBag(event) {
    event.preventDefault()
    toast.closeAll()

    const { 'choose-color': chooseColor, 'choose-size': chooseSize } = event.target.elements

    if (!chooseColor.value || !chooseSize.value) {
      toast({
        status: 'warning',
        title: 'Warning',
        description: 'Choose color and size first before adding to bag'
      })

      return
    }

    const value = {
      name: shoes.name,
      price: shoes.price,
      color: chooseColor.value,
      size: chooseSize.value
    }

    // TODO: store value to storage & update bag
    window.console.log(`TCL ~ value`, value)
    toast({
      status: 'success',
      title: 'Added to bag'
    })
  }

  // TODO: resize image on table
  return (
    <form onSubmit={handleAddToBag} noValidate>
      <Flex direction={['column', null, null, 'row']}>
        <Box>
          <Skeleton isLoaded={!loading}>
            <Image alt={shoes.name} src="/images/shoes/image-detail-large.jpg" mx={['auto', null, null, 0]} />
          </Skeleton>

          <SimpleGrid minChildWidth={['50px', '100px']} spacing="20px" mt={[null, null, '40px', '20px']} mb="40px">
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
          mt={['0px', '2.5rem']}
          ml={['0px', null, '2.5rem', '5.5rem']}
          w="50%"
          maxW="640px"
        >
          <Skeleton isLoaded={!loading} w="25%">
            <Text aria-label="shoes category" as="small" fontSize="16px">
              {shoes.category}
            </Text>
          </Skeleton>

          <Skeleton isLoaded={!loading} my={2}>
            <Heading aria-label="shoes name" as="h1" fontWeight="bold" fontSize="50px">
              {shoes.name}
            </Heading>
          </Skeleton>

          {loading ? (
            <>
              <Skeleton h="18px" mb={2} />
              <Skeleton h="18px" w="80%" />
            </>
          ) : (
            <Text aria-label="shoes description" textTransform="initial" fontSize="18px">
              {shoes.description}
            </Text>
          )}

          <Box mt="20px" mb="38px">
            <PlayVideo title={shoes.name} source={loading ? null : shoes.video} />
          </Box>

          <Text color="brand.black" fontSize="18px" mb="20px">
            Select Size (US)
          </Text>

          {loading ? (
            <Flex direction="row">
              {[...Array(3)].map((_, i) => (
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
              {[...Array(3)].map((_, i) => (
                <SkeletonCircle key={i} mx={1} size="12" />
              ))}
            </Flex>
          ) : (
            <ChooseColor colors={shoes.colors} />
          )}
        </Flex>
      </Flex>

      <Flex direction={['column', null, 'row']} alignItems="center" bg="#F6F6F6" px={['.5rem', '40px']} py={['1rem', '20px']} mt="40px">
        <Box flexGrow={1} mb={['.5rem', null]}>
          <DeliveryIcon w="20px" h="20px" position="relative" top="2px" mr="10px" />
          <Text as="span" textTransform="uppercase" fontSize="12px" fontWeight={400}>
            free shipping over $100 purchase
          </Text>
        </Box>

        <ButtonSubmit isLoading={loading} price={shoes.price} />
      </Flex>
    </form>
  )
}
