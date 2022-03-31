import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkClient } from 'utils/api-client'
import { Sneaker } from './sneaker'

export type Shoes = Sneaker
export type Color = Sneaker['colors'][0]

export const shoesApi = createApi({
  reducerPath: 'shoesApi',
  tagTypes: ['Shoes'],
  baseQuery: rtkClient,
  endpoints: build => ({
    allShoes: build.query<{ count: number; items: Shoes[] }, void>({
      query: () => `/shoes?limit=15`
    }),
    detailShoes: build.query<Shoes, string>({
      query: id => `/shoes/${id}`
    })
  })
})

export const { useAllShoesQuery, useDetailShoesQuery } = shoesApi
