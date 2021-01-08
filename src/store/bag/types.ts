import { Shoes } from 'services/shoes'

export interface Bag extends Shoes {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface BagState {
  items: Bag[]
  count: number
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
