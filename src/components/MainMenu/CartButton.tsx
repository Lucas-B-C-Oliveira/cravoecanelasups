'use client'

import { ShoppingCartSimpleMainMenuIcon } from '../Icons'
import { useGlobalState } from '@/store/globalStore'

export function CartButton() {
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
    <button onClick={handleCartButton} className="group">
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
    </button>
  )
}
