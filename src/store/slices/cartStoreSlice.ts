import { StateCreator } from 'zustand'
import { type ProductsToBeOrdered, type Cart, type Order } from '@/types/cart'
import { ProductData } from '@/types/product'
import { api } from '@/utils/lib/axios'
// import { env } from '@/utils/env'

export interface CartSliceState extends Cart {
  order: Order
  addProductToCart: (
    productData: ProductData | ProductsToBeOrdered,
    amountToAdd?: number,
  ) => Promise<Order>
  removeProductFromCart: (
    productData: ProductData | ProductsToBeOrdered,
    amountToRemove?: number,
  ) => Promise<Order>
}

export const cartSlice: StateCreator<CartSliceState> = (set, get) => ({
  order: {
    orderedProducts: {
      products: [],
      totalItemsPrice: '0',
      totalOrderPrice: '0',
    },
  },

  addProductToCart: async (
    productData: ProductData | ProductsToBeOrdered,
    amountToAdd: number = 1,
  ) => {
    const currentOrder = get().order

    const newOrder = await api.post(
      '/app-global-state/add-product-to-cart',
      JSON.stringify({ productData, currentOrder, amountToAdd }),
    )

    set(() => ({
      order: newOrder.data,
    }))

    return new Promise((resolve) => resolve(get().order))
  },

  removeProductFromCart: async (
    productData: ProductData | ProductsToBeOrdered,
    amountToRemove: number = 0,
  ) => {
    const currentOrder = get().order

    const newOrder = await api.post(
      '/app-global-state/remove-product-from-cart',
      JSON.stringify({ productData, currentOrder, amountToRemove }),
    )

    set(() => ({
      order: newOrder.data,
    }))

    return new Promise((resolve) => resolve(get().order))
  },
})
