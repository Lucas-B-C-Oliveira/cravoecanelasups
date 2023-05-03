import { StateCreator } from 'zustand'

export interface ProductSliceState {
  buttonAddToCartWasPressed: boolean
  setButtonAddToCartWasPressed: (wasChosen: boolean) => void
  getButtonAddToCartWasPressed: () => boolean

  productOption: string
  setProductOption: (option: string) => void
  getProductOption: () => string
}

export const productSlice: StateCreator<ProductSliceState> = (set, get) => ({
  buttonAddToCartWasPressed: false,

  setButtonAddToCartWasPressed: (wasChosen: boolean) => {
    set(() => ({
      buttonAddToCartWasPressed: wasChosen,
    }))
  },

  getButtonAddToCartWasPressed: () => {
    const wasPressed = get().buttonAddToCartWasPressed
    return wasPressed
  },

  productOption: '',

  setProductOption: (option: string) => {
    set(() => ({
      productOption: option,
    }))
  },

  getProductOption: () => {
    const option = get().productOption
    return option
  },
})
