import fetch from 'isomorphic-unfetch'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface RequestInitClient extends RequestInit {
  data?: Record<string, unknown>
}

async function request(uri: RequestInfo, requestInit?: RequestInitClient) {
  const { data, headers: customHeaders, ...customConfig } = requestInit || {}

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders
    },
    ...customConfig
  }

  return fetch(uri, config).then(async response => {
    const responseData = await response.json()
    return response.ok ? responseData : Promise.reject(responseData)
  })
}

export const client = (endpoint: string, requestInit?: RequestInitClient) => request(`${API_URL}${endpoint}`, requestInit)

export const rtkClient = fetchBaseQuery({
  baseUrl: API_URL,
  fetchFn: fetch
})

export function sneakerClient(endpoint: string) {
  const { SNEAKER_API_URL, SNEAKER_API_HOST, SNEAKER_API_KEY } = process.env

  return request(`${SNEAKER_API_URL}/${endpoint}`, {
    headers: {
      'x-rapidapi-host': SNEAKER_API_HOST,
      'x-rapidapi-key': SNEAKER_API_KEY
    }
  })
}
