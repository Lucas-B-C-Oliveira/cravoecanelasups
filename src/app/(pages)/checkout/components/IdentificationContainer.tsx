'use client'
import { usePersistStore } from '@/store/persistStore'
import { ReactElement, cloneElement } from 'react'
import { PesonalData } from './PersonalData'
import useStore from '@/store/useStore'
import { getCookie } from 'cookies-next'

interface Props {
  emailComponent: ReactElement
  loginComponent: ReactElement
  registerComponent: ReactElement
  chooseAnAddress: ReactElement
  registerAddress: ReactElement
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
  registerAddress,
  chooseAnAddress,
  isTheUserLoggedIn,
}: Props) {
  const userAcessToken = getCookie('@ecravoecanela:access_token')

  const userData = useStore(usePersistStore, (state) => state.userData)
  console.log('userAcessToken', userAcessToken)

  if (typeof userAcessToken === 'undefined') {
    return (
      <>
        {typeof userData?.email === 'undefined' && cloneElement(emailComponent)}
        {userData?.existingUser === true && cloneElement(loginComponent)}
        {userData?.existingUser === false && cloneElement(registerComponent)}
      </>
    )
  }

  return (
    <>
      <PesonalData />
      {userData?.addresses?.length <= 0 && cloneElement(registerAddress)}

      {userData?.addresses?.length > 0 &&
        typeof userData?.chosenAddress === 'undefined' &&
        cloneElement(chooseAnAddress)}

      {typeof userData?.chosenAddress !== 'undefined' &&
        cloneElement(<p>Endereço Escolhido</p>)}
    </>
  )
}
