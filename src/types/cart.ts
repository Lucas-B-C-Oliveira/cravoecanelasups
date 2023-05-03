
export type ProductsToBeOrdered = {
  title: string
  image: string
  price: string
  amount: string
  handle: string
  totalPrice: string
  variantId: string
  currencyCode: string
  id: string
}

export type OrderedProducts = {
  products: ProductsToBeOrdered[]
  totalItemsPrice: string
  shippingPrice?: string
  totalOrderPrice: string
}

enum typeCard {
  'MasterCard',
  'Visa',
}

export type CreditCardMethod = {
  cpf: string
  cartNumber: string
  typeCard: typeCard
  namePrintedOnCard: string
  expirationDate: string
  cvv: string
}

export type PixMethod = {
  key: string
}

type Payment = {
  method: CreditCardMethod | PixMethod
}

export type PersonalData = {
  fullName: string
  email: string
}

export type DeliveryAddress = {
  recipient: string
  address: string
}

type ShippingMethod = {
  shippingOption: string
  shippingPrice: string
  averageTimeToReceiveTheOrder: string
  maximumTimeToReceiveTheOrder: string
}

type Identification = {
  personalData: PersonalData
  deliveryAddress: DeliveryAddress
  shippingMethod: ShippingMethod
}

export type Order = {
  orderedProducts: OrderedProducts
  payment?: Payment
  identification?: Identification
}

export interface Cart {
  order: Order
}

interface Price {
  amount: string
  currencyCode: string
}

export interface ShippingRate {
  handle: string
  title: string
  price: Price
}

interface Customer {
  email: string
}

export interface AddressPageProps {
  deliveryAddressFilled: boolean
  checkout: Checkout
  customer: Customer
}

export interface Checkout {
  id: string,
  availableShippingRates: {
    shippingRates: ShippingRate[]
  }
  shippingAddress: ShippingAddress

}

export interface ShippingAddress {
  zip: string
  adress1: string
  city: string
  province: string
  country: string
  firstName: string
  lastName: string
  phone: string
}
