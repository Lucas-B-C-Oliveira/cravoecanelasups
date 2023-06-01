import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Options = {
  name: string
  value: string[]
}

export type Variant = {
  variantId: string
  selectedOption: {
    name: string
    value: string
  }
}

export interface ProductStateFrontEndData {
  title: string
  price: string
  image: string
  description: string
  handle: string
  id: string
  variant: Variant
  currencySymbol: string
  currencyCode: string
  altText: string
  options: Options[]
}

type ProductInCart = {
  quantity: number
  variantId: string
  productFrontEndData: ProductStateFrontEndData
}

interface myState {
  cartData: ProductInCart[]
  addProduct: (newProduct: ProductStateFrontEndData) => void
}

export const usePersistLocalStorage = create<myState>()(
  persist(
    (set, get) => ({
      cartData: [],
      addProduct: (product: ProductStateFrontEndData) => {
        console.log('product', product)

        const currentProducts = get().cartData

        const addNewProduct = currentProducts.some(
          (cartProduct: ProductInCart) =>
            product.variant.variantId === cartProduct.variantId,
        )

        console.log('addNewProduct', addNewProduct)

        if (!addNewProduct) {
          const newProduct: ProductInCart = {
            variantId: product.variant.variantId,
            quantity: 1,
            productFrontEndData: product,
          }
          set({
            cartData: [...get().cartData, newProduct],
          })
        } else {
          const newCardData = get().cartData.map(
            (cartProduct: ProductInCart) => {
              if (product.variant.variantId === cartProduct.variantId) {
                return {
                  ...cartProduct,
                  quantity: cartProduct?.quantity + 1,
                }
              }

              return cartProduct
            },
          )

          set({
            cartData: [...newCardData],
          })
        }
      },
    }),
    {
      name: '@cravoecanela:cartData', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
