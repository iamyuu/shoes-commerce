import faker from 'faker'
import { Shoes } from 'services/shoes'

export const buildShoes = (overrides?: Shoes): Shoes => ({
  name: faker.commerce.productName,
  category: faker.random.word,
  description: faker.commerce.productDescription,
  price: faker.commerce.price,
  video: faker.internet.url,
  sizes: Array(3).map(() => faker.random.number),
  colors: Array(3).map(() => ({
    name: faker.commerce.color,
    color_hash: faker.commerce.color
  })),
  ...overrides
})
