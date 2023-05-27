'use client'

import { useGlobalState } from '@/store/globalStore'

export function SearchTab() {
  const { searchTabOpen } = useGlobalState()

  if (searchTabOpen) {
    return (
      <div
        className={`
          sm:flex
          md:flex md:py-7 md:gap-8
          lg:flex lg:py-7 lg:gap-8
          xl:hidden
          2xl:hidden
          flex gap-4 h-fit w-full bg-gray-yellow-cc-900 flex-col items-center pt-3 pb-2 absolute px-6
      `}
      >
        <input
          className={`
          md:text-4xl
          lg:text-4xl lg:py-3

          w-full h-fit outline-none font-medium text-xl text-gray-yellow-cc-750 px-3.5 py-3 rounded-lg bg-white focus:outline active:outline outline-2

          `}
          type="search"
          placeholder="Busque por um produto..."
        />
        <button
          className={`

          md:text-5xl
          lg:text-6xl
          text-3xl text-yellow-cc-200 hover:stroke-hard-yellow-cc-500 active:stroke-hard-yellow-cc-500
          
        
        `}
        >
          Buscar
        </button>
      </div>
    )
  }

  return <></>
}
