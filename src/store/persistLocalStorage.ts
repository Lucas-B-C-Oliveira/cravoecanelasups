import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Options = {
  name: string
  values: string[]
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

export type ProductInCart = {
  quantity: number
  variantId: string
  productFrontEndData: ProductStateFrontEndData
}

interface myState {
  cartData: ProductInCart[]
  addProduct: (newProduct: ProductStateFrontEndData) => void
  addProductById: (productVariantId: string) => void
  removeProductById: (productVariantId: string) => void
  removeProductQuantityById: (productVariantId: string) => void
}

export const usePersistLocalStorage = create<myState>()(
  persist(
    (set, get) => ({
      cartData: [],
      addProduct: (product: ProductStateFrontEndData) => {
        const currentProducts = get().cartData

        const addOldProduct = currentProducts.some(
          (cartProduct: ProductInCart) =>
            product.variant.variantId === cartProduct.variantId,
        )

        if (!addOldProduct) {
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

      addProductById: (productVariantId: string) => {
        const newCardData = get().cartData.map((cartProduct: ProductInCart) => {
          if (productVariantId === cartProduct.variantId) {
            return {
              ...cartProduct,
              quantity: cartProduct?.quantity + 1,
            }
          }

          return cartProduct
        })

        set({
          cartData: [...newCardData],
        })
      },

      removeProductById: (productVariantId: string) => {
        const newCardData = get().cartData.filter(
          (cartProduct: ProductInCart) =>
            productVariantId !== cartProduct.variantId,
        )

        set({
          cartData: [...newCardData],
        })
      },

      removeProductQuantityById: (productVariantId: string) => {
        let indexProductToRemove: undefined | number
        const newCardData = get().cartData.map(
          (cartProduct: ProductInCart, index: number) => {
            if (productVariantId === cartProduct.variantId) {
              if (cartProduct?.quantity - 1 <= 0) {
                indexProductToRemove = index
              }

              return {
                ...cartProduct,
                quantity: cartProduct?.quantity - 1,
              }
            }

            return cartProduct
          },
        )

        if (typeof indexProductToRemove === 'number') {
          newCardData.splice(indexProductToRemove, 1)
        }

        set({
          cartData: [...newCardData],
        })
      },
    }),
    {
      name: '@cravoecanela:cartData', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
