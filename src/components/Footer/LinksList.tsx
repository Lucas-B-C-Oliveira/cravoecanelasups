import { ButtonHTMLAttributes, ReactElement, cloneElement } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  childrens: ReactElement[]
  title: string
}

export async function LinksList({ childrens, title }: Props) {
  return (
    <div
      className={`
          space-y-4
        `}
    >
      <h2
        className={`
          text-gray-yellow-cc-250 font-bold 
          md:text-base
          lg:text-xl 
          xl:text-xl 
          2xl:text-xl 
          text-base
        `}
      >
        {title}
      </h2>
      <ul
        className={`
          space-y-2.5
        `}
      >
        {childrens.length > 0 &&
          childrens.map((child: ReactElement) => {
            return cloneElement(child, {
              key: child.key,
            })
          })}
      </ul>
    </div>
  )
}
