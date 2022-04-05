import { useImage, Img, ImgProps } from '@chakra-ui/image'
import { Skeleton } from '@chakra-ui/skeleton'
import { ImageNotFound } from 'components/ui'

export interface ProductImageProps extends ImgProps {
  fallback?: React.ReactElement
}

export function ProductImage(props: ProductImageProps) {
  const status = useImage({
    src: props.src,
    loading: 'lazy'
  })

  if (!props.src && status !== 'pending') {
    return <ImageNotFound />
  }

  switch (status) {
    case 'failed':
      return <ImageNotFound />

    case 'loaded':
      return <Img {...props} />

    default:
      return props.fallback ?? <Skeleton />
  }
}
