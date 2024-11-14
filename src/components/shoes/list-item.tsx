import * as React from 'react'
import useTranslation from 'next-translate/useTranslation'
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { useInViewEffect } from 'react-hook-inview';
import { useTheme, Center, Box, Text, AspectRatio, SimpleGrid, Skeleton, LinkOverlay, LinkBox } from '@chakra-ui/react'
import { ProductImage } from './product-image'
import { useAllShoesQuery, Shoes } from 'services/shoes'
import { formatCurrency } from 'utils/misc'

function ShoesListEmpty() {
	return (
		<Center>
			<Text>No shoes found</Text>
		</Center>
	);
}

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
  const slug = props.id

  return (
    <LinkBox>
      <AspectRatio
        maxWidth="full"
        height="350px"
        maxHeight="400px"
        ratio={4 / 3}
        bg="brand.gray"
        sx={{ '> img': { objectFit: 'contain' } }}
      >
        <ProductImage src={props.image} alt={props.name} />
      </AspectRatio>

      <Box display="flex" mt={5}>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <NextLink href={`?shoes=${slug}`} as={`/shoes/${slug}`} scroll={false} passHref>
            <LinkOverlay _hover={{ textDecoration: 'underline' }}>
              <Text as="span" aria-label="shoes name" fontSize={18} color={theme.colors.brand.black}>
                {props.name}
              </Text>
            </LinkOverlay>
          </NextLink>
          <Text as="small" aria-label="shoes category" fontSize={14} fontWeight={400} color="blackAlpha.800" mt={2.5}>
            {props.brand}
          </Text>
        </Box>

        <Text as="span" aria-label="shoes price" fontSize={18} fontWeight={400} color="blackAlpha.800">
          {formatCurrency(props.price)}
        </Text>
      </Box>
    </LinkBox>
  )
}

export function ShoesList() {
  const { t } = useTranslation()
  const { ref, items, isEmpty, isLoading, isLoadingMore, isReachedEnd, isError, error } = useAllShoes();

  if (isError) {
    // @ts-expect-error
    throw new Error(error?.data?.message || error.message || t('common:unknown-error'))
  }

  if (isLoading) {
    return <ShoesListFallback />
  }

  if (isEmpty) {
    return <ShoesListEmpty />
	}

  return (
    <SimpleGrid minChildWidth="250px" spacing="24px">
      {items.map((shoes) => (
        <ShoesListItem key={shoes.sku} {...shoes} />
      ))}

      <div ref={ref}>
        {!isReachedEnd && isLoadingMore && <ShoesListFallback />}
      </div>
    </SimpleGrid>
  )
}

function useAllShoes() {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const ref = useInViewEffect(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        setPage(prev => prev + 1)
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.5 },
  );

  const { data, ...resultQuery } = useAllShoesQuery({
    page,
    filter: {
      gender: router.query.category as Shoes['gender']
    }
  })

  const items = data?.items ? [].concat(...data.items) as Shoes[] : []
  const isEmpty = data?.items ? data?.items?.length < 1 : true
  const isReachedEnd = data?.total === items.length
  const isLoadingMore = page > 0 && data?.items && data?.items?.length > 0;

  return {
    ...resultQuery,
    ref,
    items,
    isEmpty,
    isReachedEnd,
    isLoadingMore,
  }
}
