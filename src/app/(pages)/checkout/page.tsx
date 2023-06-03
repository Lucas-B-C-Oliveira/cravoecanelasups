import { CardContainer } from './components/CardContainer'
import { CheckoutForm } from './components/CheckoutForm'

export default async function Checkout() {
  return (
    <div
      className={`
      flex flex-row gap-6 pt-6  w-full  justify-center
    `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <CardContainer title="Identificação">
        <CheckoutForm />
      </CardContainer>
    </div>
  )
}
