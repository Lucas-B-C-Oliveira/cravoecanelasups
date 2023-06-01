import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type CustomAttributes = {
  key: string
  value: string
}

type ProductFrontEndData = {
  image: string
  productId: string
  customAttributes: CustomAttributes
}

type ProductInCart = {
  customAttributes: CustomAttributes[]
  quantity: number
  variantId: string
  productFrontEndData: ProductFrontEndData
}

interface myState {
  cartData: ProductInCart[]
  addProduct: (newProduct: any) => void
}

export const usePersistLocalStorage = create<myState>(
  persist(
    (set, get) => ({
      cartData: [],
      addProduct: (product: ProductFrontEndData) => {
        const currentProducts = get().cartData
        const addNewProduct = currentProducts.some(
          (cartProduct: ProductInCart) =>
            product.productId === cartProduct.variantId,
        )
        if (addNewProduct) {
          const newProduct: ProductInCart = {
            variantId: product.productId,
            quantity: 1,
            productFrontEndData: product,
            customAttributes: [
              {
                ...product.customAttributes,
              },
            ],
          }
          set({
            cartData: [...get().cartData, newProduct],
          })
        } else {
          const oldProduct = get().cartData.find(
            (cartProduct: ProductInCart) =>
              product.productId === cartProduct.variantId,
          )
          if (typeof oldProduct !== 'undefined') {
            const newProduct: ProductInCart = {
              ...oldProduct,
              quantity: oldProduct?.quantity + 1,
            }
            set({
              cartData: [...get().cartData, newProduct],
            })
          }
        }
      },
    }),
    {
      name: '@cravoecanela:cartData', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
