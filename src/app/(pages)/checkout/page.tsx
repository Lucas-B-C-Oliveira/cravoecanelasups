import { CardContainer } from './components/CardContainer'
import { EmailContainer } from './components/EmailContainer'
import { Identification } from './components/IdentificationContainer'
import { Login } from './components/LoginContainer'
import { Register } from './components/Register'

export default async function Checkout() {
  return (
    <div
      className={`
      flex flex-row gap-6 pt-6  w-full  justify-center
    `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <CardContainer title="Identificação">
        <Identification
          emailComponent={<EmailContainer />}
          loginComponent={<Login />}
          registerComponent={<Register />}
          isTheUserLoggedIn={false}
        />
      </CardContainer>
    </div>
  )
}
