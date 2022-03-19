import { HYDRATE } from 'next-redux-wrapper'
import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkClient } from 'utils/api-client'

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
  baseQuery: rtkClient,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
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
