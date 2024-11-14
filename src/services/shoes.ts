import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkClient } from 'utils/api-client'
import { Sneaker, Gender } from './sneaker'

export type Shoes = Sneaker
export type Color = Sneaker['colors'][0]

type FilterRange = 'lt' | 'gt' | 'lte' | 'gte'
type ShoesParams = {
  page: number
  limit: number
  sortBy: 'latest' | 'retailPrice'
  sortOrder: 'asc' | 'desc'
  filter: Partial<{
    name: string
    brand: string
    gender: Gender
    price: {
      min?: number
      max?: number
    }
    /**
     * lt – less than
     * gt – greater than
     * lte – less than or equal to
     * gte – greater than or equal to
     *
     * Format: YYYY-MM-DD
     */
    releaseYear: `${FilterRange}:${string}`
  }>
}

export const shoesApi = createApi({
  reducerPath: 'shoesApi',
  tagTypes: ['Shoes'],
  baseQuery: rtkClient,
  endpoints: build => ({
    allShoes: build.query<{ total: number; items: Shoes[] }, Partial<ShoesParams> | void>({
      query: ({ page = 0, limit = 25, filter, sortBy, sortOrder = 'asc' } = {}) => {
        const qs = new URLSearchParams()

        if (page) {
          qs.set('page', page.toString())
        }

        if (limit) {
          qs.set('limit', limit.toString())
        }

        if (filter?.name) {
          qs.set('name', filter.name)
        }

        if (filter?.brand) {
          qs.set('brand', filter.brand)
        }

        if (filter?.gender) {
          qs.set('gender', filter.gender.toUpperCase())
        }

        if (filter?.releaseYear) {
          qs.set('releaseYear', filter.releaseYear)
        }

        const sort = sortBy ? `${sortBy}:${sortOrder}` : ''
        if (sort && sortBy !== 'latest') {
          qs.set('sort', sort)
        }

        return `/shoes?${qs.toString()}`
      },
      transformResponse: (response: { total: number; items: Shoes[] }, _meta, args = {}) => {
        const filter = args?.filter
        let items = [...response.items]

        if (filter?.price) {
          items = items.filter(item => {
            const minPrice = filter.price.min
            const maxPrice = filter.price.max

            if (minPrice && maxPrice) {
              return item.price >= minPrice && item.price <= maxPrice
            }

            if (minPrice) {
              return item.price >= minPrice
            }

            if (maxPrice) {
              return item.price <= maxPrice
            }
          })
        }

        return {
          total: response.total,
          items: items
        }
      }
    }),
    detailShoes: build.query<Shoes, string>({
      query: id => `/shoes/${id}`
    })
  })
})

export const { useAllShoesQuery, useDetailShoesQuery } = shoesApi
