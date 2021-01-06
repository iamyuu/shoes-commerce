/* eslint-disable camelcase */

export interface Shoes {
  name: string
  category: string
  description: string
  price: number
  sizes: string[]
  colors: Color[]
  video: string
}

export interface Color {
  name: string
  color_hash: string
}
