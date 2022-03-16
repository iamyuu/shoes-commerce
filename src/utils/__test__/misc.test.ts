import { formatCurrency, slugify } from '../misc'

test('formatCurrency formats the currency to look nice', () => {
  expect(formatCurrency.format(300)).toEqual('SGD 300')
})

test('slugify formats string to kebab case', () => {
  expect(slugify('Some word')).toEqual('some-word')
  expect(slugify('Some--word')).toEqual('some-word')
  expect(slugify('šòme wőrd')).toEqual('some-word')
  expect(slugify('Some & word')).toEqual('some-and-word')
})
