import { createApi } from '@reduxjs/toolkit/query/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useInViewEffect } from 'react-hook-inview'
import { rtkClient } from 'utils/api-client'
import { Sneaker, Gender } from './sneaker'

export type Shoes = Sneaker
export type Color = Sneaker['colors'][0]

/**
 * lt – less than
 * gt – greater than
 * lte – less than or equal to
 * gte – greater than or equal to
 */
export type FilterRange = 'lt' | 'gt' | 'lte' | 'gte'
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
    releaseYear: string // FilterRange_YYYY-MM-DD
  }>
}

export const shoesApi = createApi({
  reducerPath: 'shoesApi',
  tagTypes: ['Shoes'],
  baseQuery: rtkClient,
  endpoints: build => ({
    allShoes: build.query<{ total: number; items: Shoes[] }, Partial<ShoesParams> | void>({
      query: ({ page = 0, limit = 20, filter, sortBy, sortOrder = 'asc' } = {}) => {
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
          qs.set('brand', filter.brand.toLowerCase())
        }

        if (filter?.gender) {
          qs.set('gender', filter.gender.toUpperCase())
        }

        if (filter?.releaseYear) {
          qs.set('releaseYear', filter.releaseYear)
        }

        const sort = sortBy ? `${sortBy}:${sortOrder}` : ''
        // only apply sort if sortBy is not latest, because latest actually is doesn't exist
        if (sort && sortBy !== 'latest') {
          qs.set('sort', sort)
        }

        return `/shoes?${qs.toString()}`
      },
      transformResponse: (response: { total: number; items: Shoes[] }, _meta, args = {}) => {
        let items = [...response.items]
        const filter = args?.filter

        const minPrice = filter?.price?.min ?? 0
        const maxPrice = filter?.price?.max ?? 0

        if (minPrice > 0 && maxPrice > 0) {
          items = items.filter(item => {
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
    }),
    allBrand: build.query<string[], void>({
      query: () => '/brand'
    })
  })
})

export const { useAllShoesQuery, useDetailShoesQuery, useAllBrandQuery } = shoesApi

export function useAllShoes() {
  const router = useRouter()

  const [page, setPage] = useState(0)
  const bottomRef = useInViewEffect(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        setPage(prev => prev + 1)
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.25 }
  )

  const [sortBy, sortOrder] = String(router.query.sort)?.split('_') ?? ['latest', 'desc']
  const filter = {
    name: router.query.q as string,
    brand: router.query.brand as string,
    releaseYear: router.query.releaseYear as string,
    gender: router.query.category as Shoes['gender'],
    price: {
      min: Number(router.query.min_price || ''),
      max: Number(router.query.max_price || '')
    }
  }

  const [items, setItems] = useState<Array<Shoes[]>>([])
  const { data, ...resultQuery } = useAllShoesQuery({
    page,
    limit: 20,
    sortBy: sortBy as ShoesParams['sortBy'],
    sortOrder: sortOrder as ShoesParams['sortOrder'],
    filter
  })

  useEffect(() => {
    if (data?.items) {
      setItems(prev => [...prev, data?.items ?? []])
    }
  }, [data?.items])

  const flatItems = items.flat()
  const total = data?.total ?? 0
  const isEmpty = flatItems.length < 1
  const isReachedEnd = total === flatItems.length
  const isLoadingMore = page > 0 && flatItems.length > 0 ? resultQuery.isFetching : false

  return {
    ...resultQuery,
    bottomRef,
    items: flatItems,
    isEmpty,
    isReachedEnd,
    isLoadingMore
  }
}
