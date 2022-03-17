import * as React from 'react'
import { useTheme, Box, Text, AspectRatio, Image, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { NextChakraLink } from 'components/helpers'
import { useAllShoesQuery, Shoes } from 'services/shoes'
import { formatCurrency, slugify } from 'utils/misc'

function ShoesListFallback() {
  return (
    <SimpleGrid minChildWidth="250px" spacing="24px">
      {[...Array(8)].map((_, i) => (
        <Box key={i}>
          <Skeleton height="300px" />

          <Box mt={2} display="flex">
            <Box display="flex" flexDirection="column" flexGrow={1}>
              <Skeleton height="18px" width="8rem" mb={2} />
              <Skeleton height="12px" width="5rem" />
            </Box>

            <Skeleton height="18px" width="2.5rem" />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}

function ShoesListItem(props: Shoes) {
  const theme = useTheme()
  const slug = slugify(props.name)

  return (
    <NextChakraLink href={`?shoes=${slug}`} as={`/shoes/${slug}`} scroll={false} _hover={{ textTransform: 'none' }}>
      <AspectRatio
        maxWidth="full"
        height="350px"
        maxHeight="400px"
        ratio={4 / 3}
        bg="brand.gray"
        sx={{ '> img': { objectFit: 'contain' } }}
      >
        <Image src={`/images/shoes/image-5.jpg`} alt={props.name} />
      </AspectRatio>

      <Box display="flex" mt="20px">
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Text as="span" aria-label="shoes name" fontSize={18} color={theme.colors.brand.black}>
            {props.name}
          </Text>
          <Text as="small" aria-label="shoes category" fontSize={14} fontWeight={400} color="rgba(0, 0, 0, 0.7)" mt="10px">
            {props.category}
          </Text>
        </Box>

        <Text as="span" aria-label="shoes price" fontSize={18} fontWeight={400} color="rgba(0, 0, 0, 0.7)">
          {formatCurrency.format(props.price)}
        </Text>
      </Box>
    </NextChakraLink>
  )
}

export function ShoesList() {
  const { data: allShoes, isLoading, error } = useAllShoesQuery()
  console.log(`🚀 ~ ShoesList ~ error`, error)

  if (error) {
    throw error
  }

  if (isLoading) {
    return <ShoesListFallback />
  }

  return (
    <SimpleGrid minChildWidth="250px" spacing="24px">
      {allShoes?.map((shoes, index) => (
        <ShoesListItem key={index} {...shoes} />
      ))}
    </SimpleGrid>
  )
}
