import useSWR from 'swr'
import { slugify } from 'utils/misc'

export interface Shoes {
  name: string
  category: string
  description: string
  price: number
  video: string
  sizes: string[]
  colors: Color[]
}

export interface Color {
  name: string
  color_hash: string
}

export function useAllShoes() {
  const { data, ...result } = useSWR<Shoes[], Error>('/shoes.json')

  return {
    ...result,
    loading: !data,
    allShoes: data
  }
}

export function useSingleShoes(slug: string) {
  const { allShoes, ...result } = useAllShoes()
  const filteredShoes = allShoes?.filter(val => slugify(val.name) === slug)
  const hasShoes = Array.isArray(filteredShoes) && filteredShoes.length > 0

  const error = result.error || !hasShoes ? new Error('Shoes not found') : null
  const shoes: Shoes = hasShoes ? filteredShoes[0] : ({} as Shoes)
  const loading = !shoes || !shoes.sizes || !shoes.colors

  return {
    ...result,
    loading,
    error,
    shoes
  }
}
