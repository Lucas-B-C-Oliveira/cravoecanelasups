'use client'

import { useRouter } from 'next/navigation'

import { Order } from '@/types'
import { setCookie } from 'nookies'

interface Props {
  currentOrder: Order
}

function setCurrentOrderToCookie(currentOrder: Order) {
  console.log('CLOSE ORDER currentOrder', currentOrder)

  setCookie(null, '@ecravoecanela:currentOrder', JSON.stringify(currentOrder), {
    maxAge: 60 * 60 * 24 * 7, // expira em 7 dias
    path: '/',
    // sameSite: 'lax',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  })
}

export function CloseOrderButton({ currentOrder }: Props) {
  const router = useRouter()

  function handleClick() {
    setCurrentOrderToCookie(currentOrder)
    router.push('/checkout/acesso')
  }

  return (
    <>
      <button onClick={handleClick}>Fechar pedido</button>
    </>
  )
}
