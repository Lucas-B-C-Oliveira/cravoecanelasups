'use client'

import { useRouter } from 'next/navigation'
import {
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactElement
  href: string
}

export function ButtonMainMenu({ children, icon, href }: ButtonProps) {
  const router = useRouter()

  function handleFunction() {
    router.push(href)
  }

  return (
    <button
      onClick={handleFunction}
      className="group whitespace-nowrap text-yellow-cc-200 text-lg font-semibold flex items-center gap-1.5  active:text-hard-yellow-cc-500 hover:text-hard-yellow-cc-500"
    >
      <span>{children}</span>
      {icon &&
        cloneElement(icon, {
          className:
            'stroke-yellow-cc-200 w-5 h-5 group-hover:stroke-hard-yellow-cc-500 group-active:stroke-hard-yellow-cc-500',
        })}
    </button>
  )
}
