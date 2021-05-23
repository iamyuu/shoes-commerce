import useSWR from 'swr'

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

const loadingShoes: Shoes = {
  name: `Loading shoes`,
  price: 0,
  description: `Loading shoes`,
  category: `loading`,
  video: ``,
  sizes: [],
  colors: []
}

export function useAllShoes() {
  const { data, ...result } = useSWR<Shoes[], Error>(`/shoes`)

  return {
    ...result,
    loading: !data,
    allShoes: data
  }
}

export function useSingleShoes(slug?: string) {
  const { data, ...result } = useSWR<Shoes, Error>(slug ? `/shoes/${slug}` : undefined)

  return {
    ...result,
    loading: !data,
    shoes: data || loadingShoes
  }
}
