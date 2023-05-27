'use client'
import {
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactElement
}

export function SearchProductsSidebarButton({ children, icon }: ButtonProps) {
  // const router = useRouter()

  function handleFunction() {
    // router.push(href)
  }

  return (
    <button
      onClick={handleFunction}
      className={`
      group whitespace-nowrap  text-base px-2.5 py-1.5
      flex flex-row  gap-1.5  active:text-hard-yellow-cc-500 hover:text-hard-yellow-cc-500
      text-gray-yellow-cc-800 font-semibold items-center
      bg-gradient-to-t from-gradient-yellow-cc-600 from-10% to-gradient-yellow-cc-500 to-90% rounded-lg
      `}
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
