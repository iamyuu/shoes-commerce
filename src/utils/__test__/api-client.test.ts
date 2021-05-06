import { client } from '../api-client'

test(`calls fetch at the endpoint with the arguments for GET requests`, async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }

  const originalFetch = window.fetch
  window.fetch = async (url, config) => {
    if (url.toString().endsWith(endpoint)) {
      return {
        ok: true,
        json: async () => mockResult
      } as Response
    }

    return originalFetch(url, config)
  }

  const result = await client(endpoint)

  expect(result).toEqual(mockResult)
})

test(`allows for config overrides`, async () => {
  let request
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }

  const originalFetch = window.fetch
  window.fetch = async (url, config) => {
    request = config
    if (url.toString().endsWith(endpoint)) {
      return {
        ok: true,
        json: async () => mockResult
      } as Response
    }

    return originalFetch(url, config)
  }

  const customConfig = {
    mode: 'cors' as RequestMode,
    method: 'PUT',
    headers: { 'Content-Type': 'fake-type' }
  }

  await client(endpoint, customConfig)

  expect(request.mode).toBe(customConfig.mode)
  expect(request.method).toBe(customConfig.method)
  expect(request.headers['Content-Type']).toBe(customConfig.headers['Content-Type'])
})

test(`correctly rejects the promise if there's an error`, async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { message: 'ERROR' }
  const originalFetch = window.fetch

  window.fetch = async (url, config) => {
    if (url.toString().endsWith(endpoint)) {
      return {
        ok: false,
        json: async () => mockResult
      } as Response
    }

    return originalFetch(url, config)
  }

  await expect(client(endpoint)).rejects.toEqual(mockResult)
})

test(`when data is provided, it's stringified and the method defaults to POST`, async () => {
  const endpoint = 'test-endpoint'
  const originalFetch = window.fetch

  window.fetch = async (url, config) => {
    if (url.toString().endsWith(endpoint)) {
      return {
        ok: true,
        json: async () => JSON.parse(config.body as string)
      } as Response
    }

    return originalFetch(url, config)
  }

  const data = { a: 'b' }
  const result = await client(endpoint, { data })

  expect(result).toEqual(data)
})
