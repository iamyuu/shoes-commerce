import { formatCurrency } from '../misc'

test.todo('formatCurrency formats the currency to look nice', () => {
  expect(formatCurrency(300)).toEqual('SGD 300')
})
