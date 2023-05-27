import { create } from 'zustand'

type StoreProps = {
  productsInCart: any[]
  addProductToCart: (newProduct: any) => void

  variantOptionSelected: {
    name: string
    value: string
  }

  setVariantOptionSelected: (newValue: { name: string; value: string }) => void

  buttonAddToCartOrBuyWasClicked: boolean
  setButtonAddToCartOrBuyWasClicked: (newValue: boolean) => void

  minPriceProductsSlider: string
  setMinPriceProductsSlider: (newMinPrice: string) => void

  maxPriceProductsSlider: string
  setMaxPriceProductsSlider: (newMaxPrice: string) => void

  hamburguerMenuOpen: boolean
  openOrCloseHamburguerMenu: () => void

  searchTabOpen: boolean
  openOrCloseSearchTab: () => void

  cartsidebarOpen: boolean
  openOrCloseCartsidebar: () => void
}

export const useGlobalState = create<StoreProps>((set) => ({
  productsInCart: [],
  addProductToCart: (newProduct: any) => {
    set((state) => ({
      productsInCart: [{ ...newProduct }, ...state.productsInCart],
    }))
  },

  variantOptionSelected: {
    name: '',
    value: 'Selecione',
  },
  setVariantOptionSelected: (newOptionSelected: {
    name: string
    value: string
  }) => {
    set(() => ({
      variantOptionSelected: newOptionSelected,
    }))
  },

  buttonAddToCartOrBuyWasClicked: false,
  setButtonAddToCartOrBuyWasClicked: (newValue: boolean) => {
    set(() => ({
      buttonAddToCartOrBuyWasClicked: newValue,
    }))
  },

  minPriceProductsSlider: '0,00',
  setMinPriceProductsSlider: (newMinPrice: string) => {
    set(() => ({
      minPriceProductsSlider: newMinPrice,
    }))
  },

  maxPriceProductsSlider: '0,00',
  setMaxPriceProductsSlider: (newMaxPrice: string) => {
    set(() => ({
      minPriceProductsSlider: newMaxPrice,
    }))
  },

  hamburguerMenuOpen: false,
  openOrCloseHamburguerMenu: () => {
    set((state) => ({
      hamburguerMenuOpen: !state.hamburguerMenuOpen,
    }))
  },

  searchTabOpen: false,
  openOrCloseSearchTab: () => {
    set((state) => ({
      searchTabOpen: !state.searchTabOpen,
    }))
  },

  cartsidebarOpen: false,
  openOrCloseCartsidebar: () => {
    set((state) => ({
      cartsidebarOpen: !state.cartsidebarOpen,
    }))
  },
}))
