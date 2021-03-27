import { Shoes } from 'services/shoes'

export interface Bag extends Omit<Shoes, 'sizes' | 'colors'> {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface BagState {
  items: Bag[]
  count: number
  total: number
}

export interface AddOrUpdateAction {
  newItem: Bag
}

export interface RemoveAction {
  index: number
}

export interface SetQuantityAction {
  index: number
  newQuantity: string
}
