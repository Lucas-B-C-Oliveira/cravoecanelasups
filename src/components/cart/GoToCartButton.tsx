'use client'

import { useRouter } from 'next/navigation'

export function GoToCartButton() {
  const router = useRouter()

  function handleClick() {
    router.push('/cart')
  }

  return (
    <>
      <button onClick={handleClick}>Ir para o Carrinho</button>
    </>
  )
}
