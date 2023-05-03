'use client'

import { type Order, type ProductsToBeOrdered } from '@/types'
import Image from 'next/image'
import { Suspense } from 'react'
import { RemoveProductButton } from './RemoveProductButton'
import { AddOrRemoveProductOfCartButton } from './AddOrRemoveProductOfCartButton'
import { InputOfProductAmount } from './InputOfProductAmount'
import { GoToCartButton } from './GoToCartButton'

interface Props {
  order: Order
}

export function CartSidebarWithProducts({ order }: Props) {
  const products = order.orderedProducts.products

  return (
    <>
      {products &&
        products.map((product: ProductsToBeOrdered) => (
          <div key={product.handle}>
            <h4>{product.title}</h4>
            <Suspense fallback={<p>loading</p>}>
              <Image alt="teste" src={product.image} width={200} height={200} />
            </Suspense>
            <RemoveProductButton productData={product} />
            <AddOrRemoveProductOfCartButton
              productData={product}
              buttonType="+"
            />
            <InputOfProductAmount productData={product} />
            <AddOrRemoveProductOfCartButton
              productData={product}
              buttonType="-"
            />
            <p>{product.totalPrice}</p>
          </div>
        ))}

      <div>
        <h3>Resumo do Pedido</h3>
        <p>Subtotal {order.orderedProducts.totalOrderPrice}</p>
        <GoToCartButton />
      </div>
    </>
  )
}
