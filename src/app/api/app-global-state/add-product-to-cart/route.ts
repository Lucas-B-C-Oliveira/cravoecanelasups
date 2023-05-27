import { type Order, type ProductData, type ProductsToBeOrdered } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { productData, currentOrder, amountToAdd } = await req.json()

  const newOrder = addProdutsToCart(productData, currentOrder, amountToAdd)

  return NextResponse.json(newOrder)
}

function addProdutsToCart(
  productData: ProductData | ProductsToBeOrdered,
  currentOrder: Order,
  amountToAdd: number,
): Order {
  const { handle } = productData

  const productsInOrder = currentOrder.orderedProducts.products

  if (productsInOrder.length === 0) {
    return addNewProductToEmptyCar(productData, amountToAdd)
  } else {
    const IsThereAnyProductInTheCart = productsInOrder.some(
      (product: ProductsToBeOrdered) => product.handle === handle,
    )

    if (IsThereAnyProductInTheCart) {
      return addProductThatIsAlreadyInTheCart(
        productsInOrder,
        handle,
        amountToAdd,
      )
    } else {
      return addProductThatIsNotInTheCart(
        productData,
        productsInOrder,
        amountToAdd,
      )
    }
  }
}

function addNewProductToEmptyCar(
  {
    image,
    price,
    title,
    handle,
    id,
    variantId,
    currencyCode,
  }: ProductData | ProductsToBeOrdered,
  amountToAdd: number,
): Order {
  const newProduct = {
    image,
    price,
    title,
    handle,
    id,
    variantId,
    currencyCode,
    amount: `${amountToAdd}`,
    totalPrice: price,
  }

  const newProducts = [newProduct]

  return {
    orderedProducts: {
      products: newProducts,
      totalOrderPrice: price,
      totalItemsPrice: price,
    },
  }
}

function addProductThatIsAlreadyInTheCart(
  productsInOrder: ProductsToBeOrdered[],
  handle: string,
  amountToAdd: number,
): Order {
  const newProducts = productsInOrder.map(
    (productInOrder: ProductsToBeOrdered) => {
      if (productInOrder.handle === handle) {
        const newAmount =
          amountToAdd > 1
            ? amountToAdd
            : Number(productInOrder.amount) + amountToAdd
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

  let newTotalItemsPrice = 0
  let newTotalOrderPrice = 0

  const productsWithCalculatedPrice: ProductsToBeOrdered[] = newProducts.map(
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

function addProductThatIsNotInTheCart(
  {
    image,
    price,
    title,
    handle,
    id,
    variantId,
    currencyCode,
  }: ProductData | ProductsToBeOrdered,
  productsInOrder: ProductsToBeOrdered[],
  amountToAdd: number,
): Order {
  const newProduct = {
    currencyCode,
    image,
    variantId,
    price,
    title,
    handle,
    id,
    amount: `${amountToAdd}`,
    totalPrice: price,
  }

  const newProducts = [newProduct]

  for (let i = productsInOrder.length - 1; i >= 0; i--) {
    newProducts.push(productsInOrder[i])
  }

  let newTotalItemsPrice = 0
  let newTotalOrderPrice = 0

  const productsWithCalculatedPrice: ProductsToBeOrdered[] = newProducts.map(
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
