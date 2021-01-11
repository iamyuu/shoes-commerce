import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Bag, BagState, AddOrUpdateAction, RemoveAction, SetQuantityAction } from './types'

const initialState: BagState = {
  count: 0,
  total: 0,
  items: []
}

const countTotal = (items: Bag[]) => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)

const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addOrUpdate: (state, action: PayloadAction<AddOrUpdateAction>) => {
      const { newItem } = action.payload
      const getIndex = state.items.findIndex(val => val.name === newItem.name)

      if (getIndex !== -1) {
        const getItem = state.items[getIndex]

        // TODO: add multiple color & size
        state.items[getIndex] = { ...getItem, quantity: getItem.quantity + 1 }
      } else {
        state.count += 1
        state.items = [...state.items, newItem]
      }

      state.total = countTotal(state.items)
    },
    remove: (state, action: PayloadAction<RemoveAction>) => {
      state.count -= 1
      state.items = [...state.items].splice(action.payload.index, 1)
      state.total = countTotal(state.items)
    },
    setQuantity: (state, action: PayloadAction<SetQuantityAction>) => {
      const { index, newQuantity } = action.payload
      const updatedBagItems = [...state.items]

      updatedBagItems[index] = {
        ...updatedBagItems[index],
        quantity: parseInt(newQuantity, 10) || 1
      }

      state.items = updatedBagItems
      state.total = countTotal(updatedBagItems)
    }
  }
})

export const { addOrUpdate, remove, setQuantity } = bagSlice.actions

export default bagSlice.reducer
