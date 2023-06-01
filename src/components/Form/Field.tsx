import { HTMLAttributes } from 'react'

interface FieldProps<T = HTMLDivElement | HTMLLabelElement>
  extends HTMLAttributes<T> {
  as?: string
}

export function Field<T = HTMLDivElement | HTMLLabelElement>(
  props: FieldProps<T>,
) {
  if (props?.as === 'label') {
    return <label {...props} />
  } else {
    return <div className="flex flex-col w-full" {...props} />
  }
}
