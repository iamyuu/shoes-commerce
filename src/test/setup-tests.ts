import '@testing-library/jest-dom/extend-expect'
import { server } from 'test/server'
import { store } from 'store'
import { shoesApi } from 'services/shoes'

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

// general cleanup
afterEach(() => {
  store.dispatch(shoesApi.util.resetApiState())
})
