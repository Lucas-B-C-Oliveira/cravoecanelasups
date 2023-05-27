'use client'

import { useGlobalState } from '@/store/globalStore'
import { useRouter } from 'next/navigation'

const buttonsNavigation = [
  {
    name: 'Entrar',
    href: '/signinAndSignup',
  },
  {
    name: 'Contato',
    href: '#contato',
  },
  {
    name: 'Produtos',
    href: '/products/mais-vendidos',
  },

  {
    name: 'Lojas Físicas',
    href: '#lojas-fisicas',
  },
]

export function HamburguerMenuListTab() {
  const { hamburguerMenuOpen } = useGlobalState()
  const router = useRouter()

  function handleButton(href: string) {
    router.push(href)
  }

  if (hamburguerMenuOpen) {
    return (
      <div
        className={`
          sm:flex
          md:flex md:py-7 md:gap-8
          lg:flex lg:py-7 lg:gap-8
          xl:hidden
          2xl:hidden
          flex gap-4 h-fit w-full bg-gray-yellow-cc-900 flex-col items-center pt-3 pb-2 absolute
      `}
      >
        {buttonsNavigation.map((item) => (
          <button
            onClick={() => handleButton(item.href)}
            key={item.name}
            className={`

            md:text-3xl
            lg:text-3xl
            
            group whitespace-nowrap text-yellow-cc-200 text-lg font-semibold  active:text-hard-yellow-cc-500 hover:text-hard-yellow-cc-500`}
          >
            {item.name}
          </button>
        ))}
      </div>
    )
  }

  return <></>
}
