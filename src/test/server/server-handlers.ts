import { rest } from 'msw'
import { buildShoes } from 'test/generate'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const handlers = [
  rest.get(`${API_URL}/shoes`, (_, res, ctx) => {
    const response = Array(8).map(() => buildShoes())

    return res(ctx.json(response))
  })
]
