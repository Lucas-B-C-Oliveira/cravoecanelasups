'use client'

import { useRouter } from 'next/navigation'

// import { useRouter } from 'next/navigation'
// import { setCookie } from 'nookies'

interface Props {
  handle: string
}

export function LearnMore({ handle }: Props) {
  const router = useRouter()

  function handlerLearnMoreProduct() {
    // setCookie(null, 'productData', JSON.stringify(productData))
    // const { productUniqueName } = productData
    // // const regexGetId: RegExp = /Product\/(\d+)/
    // // const id = productId.match(regexGetId)[1]
    router.push(`/product/${handle}`)
  }

  return (
    <>
      <button onClick={handlerLearnMoreProduct}>SAIBA MAIS</button>
    </>
  )
}
