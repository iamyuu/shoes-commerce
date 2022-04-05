import { sneakerClient } from 'utils/api-client'

const cache = new Map()

export type Sneaker = ReturnType<typeof transformSneaker>

interface SneakerResult {
  id: string
  sku: string
  brand: string
  name: string
  colorway: string
  gender: string
  silhouette: string
  releaseYear: string
  releaseDate: string
  retailPrice: number
  estimatedMarketValue: number
  story: string
  image: {
    original: string
    small: string
    thumbnail: string
  }
  links: Record<string, string>
}

export interface GetSneakersOptions {
  limit?: number
  page?: number
  name?: string
  gender?: string
  brand?: string
}

function transformSneaker(sneaker: SneakerResult) {
  return {
    id: sneaker.id,
    name: sneaker.name,
    brand: sneaker.brand,
    gender: sneaker.gender,
    price: sneaker.retailPrice,
    description: sneaker.story,
    image: sneaker.image.thumbnail,
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5'],
    // it would be great to have a way to get the colorways from the API
    colors: [
      {
        name: 'Just Brown',
        colorHash: '#AA6159'
      },
      {
        name: 'Mistique Black',
        colorHash: '#272425'
      },
      {
        name: 'Sky Blue',
        colorHash: '#6389CB'
      },
      {
        name: 'Somewhat Gold',
        colorHash: '#F2C758'
      }
    ]
  }
}

export async function getSneakers(params: GetSneakersOptions = { limit: 15 }) {
  const qs = Object.keys(params)
    // @ts-expect-error
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

  const cacheKey = `sneakers?${qs}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const { count, results } = await sneakerClient(cacheKey)

  const result = {
    total: count,
    items: results.map(transformSneaker)
  }

  cache.set(cacheKey, result)

  return result
}

export async function getSneakerById(id: string) {
  const cacheKey = `sneakers/${id}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const { results } = await sneakerClient(cacheKey)

  if (results.length === 0) {
    throw new Error('Shoes not found')
  }

  const result = transformSneaker(results[0])

  cache.set(cacheKey, result)

  return result
}
