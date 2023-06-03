'use client'

import { useStore } from 'zustand';
import { ShoppingCartSimpleMainMenuIcon } from '../Icons'
import { useGlobalState } from '@/store/globalStore'
import { usePersistLocalStorage } from "@/store/persistLocalStorage";

export function CartButton() {
  const cartData = useStore(usePersistLocalStorage, (state) => state.cartData);
  const totalQuantity = cartData.reduce((acc, obj) => acc + obj.quantity, 0);

  const {
    searchTabOpen,
    hamburguerMenuOpen,
    openOrCloseCartsidebar,
    openOrCloseHamburguerMenu,
    openOrCloseSearchTab,
  } = useGlobalState()

  function handleCartButton() {
    if (hamburguerMenuOpen) openOrCloseHamburguerMenu()
    if (searchTabOpen) openOrCloseSearchTab()
    console.log('eaa')
    openOrCloseCartsidebar()
  }

  return (
    <button onClick={handleCartButton} className="relative group">
      <ShoppingCartSimpleMainMenuIcon
        className={`
      sm:w-8 sm:h-8
      md:w-12 md:h-12
      lg:w-12 lg:h-12
      xl:w-12 xl:h-12
      2xl:w-12 2xl:h-12
      w-8 h-8
    `}
      />
      <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        {totalQuantity}{/* Aqui você pode substituir "10" pelo número desejado */}
      </span>
    </button>
  )
}
