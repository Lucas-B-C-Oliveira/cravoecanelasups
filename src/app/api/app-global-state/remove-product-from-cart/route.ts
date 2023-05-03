import { type Order, type ProductsToBeOrdered } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { productData, currentOrder, amountToRemove } = await req.json()
  const newOrder = removeProdutsFromCart(
    productData,
    currentOrder,
    amountToRemove,
  )
  return NextResponse.json(newOrder)
}

function removeProdutsFromCart(
  productData: ProductsToBeOrdered,
  currentOrder: Order,
  amountToRemove: number = 0,
): Order {
  const { handle } = productData
  const productsInOrder = currentOrder.orderedProducts.products

  if (amountToRemove === 0) {
    return removeProducsFromCartByHandle(productsInOrder, handle)
  } else {
    return removeProductsFromCartByAmount(
      productsInOrder,
      handle,
      amountToRemove,
    )
  }
}

function removeProductsFromCartByAmount(
  productsInOrder: ProductsToBeOrdered[],
  handle: string,
  amountToRemove: number,
): Order {
  let removeAllProductsOfThatHandle = false

  const newProducts = productsInOrder.map(
    (productInOrder: ProductsToBeOrdered) => {
      if (productInOrder.handle === handle) {
        const newAmount =
          amountToRemove > 1
            ? amountToRemove
            : Number(productInOrder.amount) - amountToRemove

        if (newAmount < 1) removeAllProductsOfThatHandle = true
        const newTotalPrice = Number(productInOrder.price) * newAmount

        return {
          ...productInOrder,
          totalPrice: `${newTotalPrice}`,
          amount: `${newAmount}`,
        }
      }
      return productInOrder
    },
  )

  if (removeAllProductsOfThatHandle) {
    return removeProducsFromCartByHandle(productsInOrder, handle)
  }

  return calculateNewPricesOfOrder(newProducts)
}

function removeProducsFromCartByHandle(
  products: ProductsToBeOrdered[],
  handle: string,
): Order {
  const productsWithoutProductOfHandle = products.filter(
    (productInOrder: ProductsToBeOrdered) => productInOrder.handle !== handle,
  )

  if (productsWithoutProductOfHandle.length < 1) {
    return {
      orderedProducts: {
        products: [],
        totalItemsPrice: '0',
        totalOrderPrice: '0',
      },
    }
  } else return calculateNewPricesOfOrder(productsWithoutProductOfHandle)
}

function calculateNewPricesOfOrder(products: ProductsToBeOrdered[]): Order {
  let newTotalItemsPrice = 0
  let newTotalOrderPrice = 0

  const productsWithCalculatedPrice: ProductsToBeOrdered[] = products.map(
    (productInOrder: ProductsToBeOrdered) => {
      const amountNumber = Number(productInOrder.amount)
      const priceNumber = Number(productInOrder.price)
      const totalProductsPriceNumber = priceNumber * amountNumber
      newTotalItemsPrice += totalProductsPriceNumber
      newTotalOrderPrice += totalProductsPriceNumber

      return {
        ...productInOrder,
        totalPrice: `${totalProductsPriceNumber}`,
      }
    },
  )

  return {
    orderedProducts: {
      products: productsWithCalculatedPrice,
      totalOrderPrice: `${newTotalOrderPrice}`,
      totalItemsPrice: `${newTotalItemsPrice}`,
    },
  }
}
