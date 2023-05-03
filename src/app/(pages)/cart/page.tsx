'use client'
import { AddOrRemoveProductOfCartButton } from '@/components/cart/AddOrRemoveProductOfCartButton'
import { CloseOrderButton } from '@/components/cart/CloseOrderButton'
import { InputOfProductAmount } from '@/components/cart/InputOfProductAmount'
import { RemoveProductButton } from '@/components/cart/RemoveProductButton'
import { useGlobalStore } from '@/store/store'
import { ProductsToBeOrdered } from '@/types'
import Image from 'next/image'

export default function CartPage() {
  const currentOrder = useGlobalStore((state) => state.order)
  const products = currentOrder.orderedProducts.products

  return (
    <>
      {products &&
        products.map((product: ProductsToBeOrdered) => (
          <div key={product.handle}>
            <h4>{product.title}</h4>
            <Image alt="teste" src={product.image} width={200} height={200} />
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
        <p>Subtotal {currentOrder.orderedProducts.totalOrderPrice}</p>
        <CloseOrderButton currentOrder={currentOrder} />
      </div>
    </>
  )
}
