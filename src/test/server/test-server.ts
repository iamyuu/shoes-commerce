import { setupServer } from 'msw/node'
import { handlers } from './server-handlers'

export * from 'msw'
export const server = setupServer(...handlers)
