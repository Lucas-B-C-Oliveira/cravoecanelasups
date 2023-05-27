import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title: string
}

export async function CardContainer({ children, title }: Props) {
  return (
    <div
      className={`
        flex flex-col gap-6 p-6 rounded-lg
        bg-gradient-to-t from-gradient-yellow-cc-650 to-gradient-yellow-cc-450
        w-[21rem] h-min-80 h-fit
        shadow-color-checkout-tables-cc
        shadow-checkout-tables-cc
      `}
    >
      <h1
        className={`
        font-bold text-gray-yellow-cc-900 text-xl
      `}
      >
        {title}
      </h1>

      {children}
    </div>
  )
}
