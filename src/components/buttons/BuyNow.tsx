'use client'

// import { useRouter } from 'next/navigation'
// import { setCookie } from 'nookies'

interface BuyNowProps {
  productData?: any
}

export function BuyNow({ productData }: BuyNowProps) {
  // const router = useRouter()

  function handlerBuyNowProduct() {
    // setCookie(null, 'productData', JSON.stringify(productData))
    // const { productUniqueName } = productData
    // // const regexGetId: RegExp = /Product\/(\d+)/
    // // const id = productId.match(regexGetId)[1]
    // router.push(`/product/${productUniqueName}`)
  }

  return (
    <>
      <button onClick={handlerBuyNowProduct}>Comprar Agora</button>
    </>
  )
}
