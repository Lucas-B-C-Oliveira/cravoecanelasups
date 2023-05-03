'use client'

import { useGlobalStore } from '@/store/store'
import { CartSidebarWithProducts } from './CartSidebarWithProducts'

// import Image from 'next/image'
// import { Suspense } from 'react'

export function CartSidebar() {
  const currentOrder = useGlobalStore((state) => state.order)
  const products = currentOrder.orderedProducts.products
  const productsInCar = products.length

  return (
    <>
      <aside
        className="sidebar"
        style={{
          backgroundColor: '#f2f2f2',
          width: '350px',
          position: 'fixed',
          top: '0',
          right: '0',
          bottom: '0',
          maxWidth: '300px',
          maxHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {productsInCar ? (
          <>
            <CartSidebarWithProducts order={currentOrder} />
          </>
        ) : (
          <>
            <h1>SEU CARRINHO ESTÁ VAZIO</h1>
            <p>
              Navegue agora pelas categorias de nossa loja e escolha os produtos
              desejados para adicionar em seu carrinho de compras
            </p>
          </>
        )}
      </aside>
    </>
  )
}
