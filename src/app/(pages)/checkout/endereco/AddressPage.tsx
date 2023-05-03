'use client'

import { AddressPageProps, ShippingRate } from '@/types'
import { ChangeEvent } from 'react'

export function AddressPage({
  checkout,
  deliveryAddressFilled,
  customer,
}: AddressPageProps) {
  // const cookies = parseCookies() // Obtem os cookies do cliente
  // const token = cookies.accessToken // Obtém o valor do cookie 'token'

  // console.log(token) // Exibe o valor do token no console
  // console.log('cookies', cookies) // Exibe o valor do token no console

  // console.log('token', token)

  const { shippingRates } = checkout.availableShippingRates

  async function handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
    console.log('value', event.target.id)
    console.log('checked', event.target.checked)
  }

  return (
    <>
      <h1>Frete</h1>
      {shippingRates.map((shippingRate: ShippingRate) => (
        <div key={shippingRate.handle}>
          <label>
            <input
              type="checkbox"
              id={shippingRate.handle}
              // checked={selectedOptions.includes(option.id)}
              onChange={handleOptionChange}
            />
            {shippingRate.title}
            <h4>Preço: R${shippingRate.price.amount}</h4>
          </label>
        </div>
      ))}
    </>
  )
}
