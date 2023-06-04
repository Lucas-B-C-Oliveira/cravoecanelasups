'use client'

import { useGlobalState } from '@/store/globalStore'
import { usePersistLocalStorage } from '@/store/persistLocalStorage'
import useStore from '@/store/useStore'
import { FormatRealValue } from '@/utils/helpers'
import Image from 'next/image'

export function CartSidebar() {
  const { cartsidebarOpen } = useGlobalState()

  const cartData = useStore(usePersistLocalStorage, (state) => state.cartData)
  const { openOrCloseCartsidebar } = useGlobalState()
  const { addProductById, removeProductQuantityById } = usePersistLocalStorage()

  const handleAmoutCartPrice = () => {
    const amountPrice = calcPrice()
    return amountPrice?.reduce((el, i) => el + i)
  }

  const calcPrice = () => {
    const price = 0
    return cartData?.map((e) => {
      return price + e.quantity * parseInt(e.productFrontEndData.price)
    })
  }
  return (
    <>
      {cartsidebarOpen && (
        <div
          className={`
         sm:flex
         md:flex md:py-7 md:gap-8
         lg:flex lg:py-7 lg:gap-8
         flex gap-4 w-[35rem] bg-white flex-col items-center pt-3 pb-[4rem]  px-6 right-0 z-50 max-[750px]:w-full
         shadow-2xl
         fixed inset-y-0 right-0 z-10 w-64
         
       `}
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.19) 0px 20px 30px, rgba(0, 0, 0, 0.23) 0px 10px 20px 20px',
          }}
        >
          <div className={'flex w-full max-[750px]:justify-end'}>
            <div
              className="bg-[yellow] max-[750px]:py-[2px] py-[5px]  px-[15px]  font-bold max-[750px]:text-[1rem] text-[2rem] cursor-pointer"
              onClick={() => openOrCloseCartsidebar()}
            >
              X
            </div>
          </div>
          <h3
            className={`max-[750px]:-mt-[10px] max-[750px]:text-[1.5rem] text-[2rem] text-gray-yellow-cc-850 font-bold -mt-[3rem]`}
          >
            ITENS NO CARRINHO
          </h3>
          <div className="bg-[yellow] p-[12px] rounded-lg w-full">
            <h1 className="text-[1.5rem] font-bold">Resumo do Pedido</h1>
            <h1 className="text-[1rem] font-semibold ">Subtotal:</h1>
            <h1 className="text-[1.5rem] font-bold">{`R$${FormatRealValue(
              handleAmoutCartPrice(),
            )}`}</h1>
          </div>
          {cartData?.map((e) => {
            return (
              <div className="flex w-full" key={e.variantId}>
                <Image
                  src={e.productFrontEndData.image}
                  width={150}
                  height={100}
                  alt="product image"
                />
                <div className="space-y-2">
                  <h1 className="font-semibold text-[1.5rem]">
                    {e.productFrontEndData.title}
                  </h1>
                  <span>
                    {e.productFrontEndData.variant.selectedOption.name}:{' '}
                    {e.productFrontEndData.variant.selectedOption.value}
                  </span>
                  <div className="flex">
                    <h1
                      className="text-[1.7rem] bg-[yellow] px-[10px] cursor-pointer font-bold"
                      onClick={() => removeProductQuantityById(e.variantId)}
                    >
                      -
                    </h1>
                    <h1 className="text-[1.7rem] px-[1rem]">{e.quantity}</h1>
                    <h1
                      className="text-[1.7rem] bg-[yellow] px-[10px] cursor-pointer font-bold"
                      onClick={() => {
                        addProductById(e.variantId)
                      }}
                    >
                      +
                    </h1>
                  </div>
                  <h1 className="text-[1rem] font-semibold">
                    Unidade: {FormatRealValue(e.productFrontEndData.price)}
                  </h1>
                  <h1 className="text-[1rem] font-semibold">
                    Total:{' '}
                    {FormatRealValue(
                      Number(e.productFrontEndData.price) * Number(e.quantity),
                    )}
                  </h1>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
