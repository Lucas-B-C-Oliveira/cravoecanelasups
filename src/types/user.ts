export type PersonalDataUser = {
  email: string
  permissionToReceivePromotionsByEmail?: boolean
  cpf: string
  fullName: string
  dateBirth?: string
  cellPhone: string
  landline?: string
  permissionToReceivePromotionsByWhatsApp?: boolean
  permissionToReceiveOrderUpdatesByWhatsApp?: boolean
  password: string
}

export type DeliveryAddressUser = {
  zipCode: string
  addressIdentification: string
  recipient: string
  address: string
  number: string
  complement?: string
  referencePoint?: string
  city: string
  state: string
}

enum OrderStatus {
  'waiting',
  'paidOut',
  'invoiced',
  'preparedOrder',
  'orderDispatched'
}

enum typeCard {
  'MasterCard',
  'Visa',
}

type CreditCardMethod = {
  methodTitle: string
  typeCard: typeCard
  installmentsNumber: string 
}

type PixMethod = {
  key: string
}

type DeliveryAdress = {
  recipint: string
  address: string
}

type TrackOrder = {
  code: string
}

type Invoicing = {
  nfeNumber: string
  nfeKey: string
}

type ProductsOrdered = {
  title: string
  image: string
  price: string
  amount: string
  totalPrice: string
}

type OrderSummary = {
  orderedProducts: ProductsOrdered[]
  totalItemsPrice: string
  shippingPrice: string
  totalOrderPrice: string
}

type Order = {
  orderStatus: OrderStatus
  formOfPayment: CreditCardMethod | PixMethod
  deliveryAddress: DeliveryAdress
  trackOrder: TrackOrder
  invoicing: Invoicing
  orderSummary: OrderSummary
}

type Requests = {
  orders: Order[]
}

export interface User {
  personalData: PersonalDataUser
  deliveryAddress?: DeliveryAddressUser
  requests?: Requests
}
