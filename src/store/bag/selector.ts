import { RootState } from '../store'
import { Bag, BagState } from './types'

export const selectBag = (state: RootState): BagState => state.bag

export const selectBagItems = (state: RootState): Bag[] => state.bag.items

export const selectBagCount = (state: RootState): number => state.bag.count
