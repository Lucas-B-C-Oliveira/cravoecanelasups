'use client'

import { useGlobalState } from '@/store/globalStore'

export function CartSidebar() {
  const { cartsidebarOpen } = useGlobalState()

  return (
    <>
      {cartsidebarOpen && (
        <div
          className={`
          sm:flex
          md:flex md:py-7 md:gap-8
          lg:flex lg:py-7 lg:gap-8
          xl:w-2/5
          2xl:w-2/5
          flex gap-4 h-full w-4/5 bg-white flex-col items-center pt-3 pb-2 absolute px-6 right-0  z-50
      `}
        >
          <h3
            className={`
          sm:text-xl
          md:text-2xl
          lg:text-3xl
          xl:text-4xl
          2xl:text-5xl


        text-gray-yellow-cc-850
        font-bold
        `}
          >
            ITENS NO CARRINHO
          </h3>
        </div>
      )}
    </>
  )
}
