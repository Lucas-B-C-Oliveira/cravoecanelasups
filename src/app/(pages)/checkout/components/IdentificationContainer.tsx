'use client'
import { ReactElement, ReactNode, cloneElement, useState } from 'react'

interface Props {
  emailComponent: ReactElement
  loginComponent: ReactElement
  registerComponent: ReactElement
  isTheUserLoggedIn: boolean
}

export type UserEmailData = {
  existingUser: boolean
  email: string
  id: string
}

export type UserAddressesData = {
  existingAdress: boolean
  adresses: any[]
}

export function Identification({
  emailComponent,
  loginComponent,
  registerComponent,
  isTheUserLoggedIn,
}: Props) {
  const [userEmailData, setUserEmailData] = useState<undefined | UserEmailData>(
    undefined,
  )

  const [userData, setUserData] = useState<undefined | UserAddressesData>(
    undefined,
  )

  if (!isTheUserLoggedIn && typeof userData === 'undefined') {
    return (
      <>
        {typeof userEmailData === 'undefined' &&
          cloneElement(emailComponent, { setUserEmailData })}
        {userEmailData?.existingUser &&
          cloneElement(loginComponent, { userEmailData, setUserData })}
        {userEmailData?.existingUser === false &&
          cloneElement(registerComponent, {
            userData,
            setUserData,
          })}
      </>
    )
  }

  return (
    <>
      <p>Usuário Logado e dados de endereço</p>
    </>
  )
}
