const API_URL = process.env.NEXT_PUBLIC_API_URL

interface RequestInitClient extends RequestInit {
  data?: Record<string, unknown>
}

export default function client(endpoint, requestInit?: RequestInitClient) {
  const { data, headers: customHeaders, ...customConfig } = requestInit || {}

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },
    ...customConfig
  }

  return window.fetch(`${API_URL}${endpoint}`, config).then(async response => {
    const responseData = await response.json()
    return response.ok ? responseData : Promise.reject(responseData)
  })
}
