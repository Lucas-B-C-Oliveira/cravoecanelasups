'use client'
import { useGlobalState } from '@/store/globalStore'
import {
  ArticlesMainMenuIcon,
  MapPinMainMenuIcon,
  PhoneMainMenuIcon,
  UserMainMenuIcon,
  HamburguerButtonMainMenuIcon,
  MagnifyingGlassesMainMenuIcon,
} from '../Icons/'

import { ButtonMainMenu } from './Button/ButtonMainMenu'
import { CartButton } from './CartButton'

const buttonsNavigation = [
  {
    name: 'Produtos',
    icon: <ArticlesMainMenuIcon />,
    href: '/products/mais-vendidos',
  },
  {
    name: 'Contato',
    icon: <PhoneMainMenuIcon />,
    href: '#contact',
  },
  {
    name: 'Lojas Físicas',
    icon: <MapPinMainMenuIcon />,
    href: '#physicalStores',
  }
]

export function ButtonsMainMenu() {
  const {
    openOrCloseHamburguerMenu,
    openOrCloseSearchTab,
    hamburguerMenuOpen,
    searchTabOpen,
    cartsidebarOpen,
    openOrCloseCartsidebar,
  } = useGlobalState()

  function handleSearchButton() {
    if (hamburguerMenuOpen) openOrCloseHamburguerMenu()
    if (cartsidebarOpen) openOrCloseCartsidebar()
    openOrCloseSearchTab()
  }

  function handleHamburguerMenuButton() {
    if (searchTabOpen) openOrCloseSearchTab()
    if (cartsidebarOpen) openOrCloseCartsidebar()
  
    openOrCloseHamburguerMenu()
  }

  return (
    <>
      <div
        className={`
        sm:hidden
        md:hidden
        lg:hidden
        xl:gap-6 xl:flex
        2xl:gap-16 2xl:flex
        hidden
        `}
      >
        {buttonsNavigation.map((item) => (
          <ButtonMainMenu key={item.name} icon={item.icon} href={item.href}>
            {item.name}
          </ButtonMainMenu>
        ))}
        <CartButton />
      </div>

      <div
        className={`
          sm:flex
          md:flex
          lg:flex
          xl:hidden
          2xl:hidden
          flex gap-3
        `}
      >
        <button onClick={handleSearchButton} className={`group`}>
          <MagnifyingGlassesMainMenuIcon
            className={`
              sm:w-6 sm:h-6
              md:w-8 md:h-8
              lg:w-8 lg:h-8
              stroke-yellow-cc-200 w-6 h-6 group-hover:stroke-hard-yellow-cc-100 group-active:stroke-hard-yellow-cc-500
          `}
          />
        </button>

        <button onClick={handleHamburguerMenuButton} className={`group`}>
          <HamburguerButtonMainMenuIcon
            className={`
            sm:w-8 sm:h-8
            md:w-12 md:h-12
            stroke-yellow-cc-200 w-8 h-8  group-hover:stroke-hard-yellow-cc-100 group-active:stroke-hard-yellow-cc-500`}
          />
        </button>

        <CartButton />
      </div>
    </>
  )
}
