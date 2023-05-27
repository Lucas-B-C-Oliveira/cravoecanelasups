'use client'
import Link from 'next/link'
import { ButtonHTMLAttributes, ReactElement, cloneElement } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: ReactElement
  href: string
}

export function Links({ text, icon, href }: Props) {
  return (
    <li>
      <Link
        className={`
            text-gray-yellow-cc-350 font-semibold
            md:text-base
            lg:text-lg
            xl:text-lg
            2xl:text-lg
            text-sm
            `}
        href={href}
      >
        {text}
        {icon &&
          cloneElement(icon, {
            className:
              'stroke-yellow-cc-200 w-5 h-5 group-hover:stroke-hard-yellow-cc-500 group-active:stroke-hard-yellow-cc-500',
          })}
      </Link>
    </li>
  )
}
