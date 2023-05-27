import { LabelHTMLAttributes } from 'react'

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="text-base font-semibold text-gray-yellow-cc-800 flex items-center justify-between"
      {...props}
    />
  )
}
