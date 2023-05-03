import { create } from 'zustand'
import {
  type CartSliceState,
  type ProductSliceState,
  cartSlice,
  productSlice,
} from './slices'

export const useGlobalStore = create<ProductSliceState & CartSliceState>()(
  (...a) => ({
    ...productSlice(...a),
    ...cartSlice(...a),
  }),
)
