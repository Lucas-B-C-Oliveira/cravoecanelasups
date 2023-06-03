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

export function Identification({ emailComponent, registerAddress }: Props) {
  return <>{cloneElement(registerAddress)}</>
}
