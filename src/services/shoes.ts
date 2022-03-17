import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkBaseQuery } from 'utils/api-client'

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

export const shoesApi = createApi({
  reducerPath: 'shoesApi',
  tagTypes: ['Shoes'],
  baseQuery: rtkBaseQuery,
  endpoints: build => ({
    allShoes: build.query<Shoes[], void>({
      query: () => `/shoes`
    }),
    detailShoes: build.query<Shoes, string>({
      query: slug => `/shoes/${slug}`
    })
  })
})

export const { useAllShoesQuery, useDetailShoesQuery } = shoesApi
