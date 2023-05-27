'use client'

import { useQuery } from '@tanstack/react-query'
import { memo, useRef, useState } from 'react'
import { UserEmailData } from './IdentificationContainer'
import { setCookie } from 'cookies-next'

interface Props {
  setUserData?: (value: any) => void
  userEmailData?: UserEmailData
}

function validateEmail(email: string) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

function validatePassword(password: string) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{8,}$/

  return passwordRegex.test(password)
}

function setAccessTokenToCookie(accessToken: string, maxAgeInSeconds: number) {
  setCookie('@ecravoecanela:access_token', accessToken, {
    maxAge: maxAgeInSeconds, // expira em 30 dias
    path: '/',
    // sameSite: 'lax',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  })
}

export const Login = memo(function Login({
  userEmailData,
  setUserData,
}: Props) {
  const [emailValue, setEmailValue] = useState(userEmailData?.email)
  const [passwordValue, setPasswordValue] = useState('')
  const validEmail = useRef(true)
  const validPassword = useRef(true)

  const {
    refetch: getAllUserDataToCheckoutRefetch,
    isLoading: isLoadingGetAllUserData,
    data: dataGetAllUserData,
  } = useQuery({
    queryKey: ['getAllUserDataToCheckout'],
    queryFn: async () => {
      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) +
          `/get-delivery-address`,
      )
      const result = await response.json()
      return result
    },
    enabled: false,
    onSuccess: (data) => {
      if (data.email === emailValue) {
        if (typeof setUserData !== 'undefined') {
          setUserData(data)
        }
      }
    },
  })

  const {
    isLoading: isLoadingLogin,
    refetch,
    data: dataLogin,
  } = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const response = await fetch(
        (((process.env.NEXT_PUBLIC_APPLICATION_PATH as string) +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH) as string) + `/sign-in`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        },
      )
      const result = await response.json()
      return result
    },
    enabled: false,
    onSuccess: (data) => {
      if (data.authenticated) {
        setAccessTokenToCookie(data.accessToken, data.expiresAt)
        getAllUserDataToCheckoutRefetch()
      }
    },
  })

  function handleButton() {
    const inputsFilled = emailValue !== '' && passwordValue !== ''
    if (validEmail.current === false || !inputsFilled) return
    refetch()
  }

  function handleEmailInput(event: any) {
    const inputValue = event.target.value
    validEmail.current = validateEmail(inputValue)
    setEmailValue(inputValue)
  }

  function handlePasswordInput(event: any) {
    const inputValue = event.target.value
    validPassword.current = validatePassword(inputValue)
    setPasswordValue(inputValue)
  }

  return (
    <div
      className={`
        flex flex-col
      `}
    >
      <div
        className={`
        flex flex-col gap-6
        items-center

      `}
      >
        <div
          className={`
          flex flex-col w-full
      
          `}
        >
          <label
            className={`
            text-base font-semibold text-gray-yellow-cc-800
          `}
          >
            E-mail
          </label>

          <input
            type="email"
            className={`
            rounded-lg
            bg-white
            px-3.5
            py-3
            text-sm text-gray-yellow-cc-750 font-medium
            shadow-inputs-checkouts-cc
            shadow-color-inputs-checkout-cc
            focus:outline-none focus:ring-2 focus:ring-gray-yellow-cc-600
            outline-none border-0
            ${
              validEmail.current === false && !!emailValue
                ? 'ring-2 ring-red-500'
                : 'ring-0'
            }
          `}
            placeholder="Digite seu e-mail"
            onChange={handleEmailInput}
            value={emailValue === '' ? userEmailData?.email : emailValue}
          />
        </div>

        <div
          className={`
          flex flex-col w-full
      
          `}
        >
          <label
            className={`
            text-base font-semibold text-gray-yellow-cc-800
          `}
          >
            Senha
          </label>

          <input
            type="password"
            className={`
            rounded-lg
            bg-white
            px-3.5
            py-3
            text-sm text-gray-yellow-cc-750 font-medium
            shadow-inputs-checkouts-cc
            shadow-color-inputs-checkout-cc
            focus:outline-none focus:ring-2 focus:ring-gray-yellow-cc-600
            outline-none border-0
            ${
              validPassword.current === false && !!passwordValue
                ? 'ring-2 ring-red-500'
                : 'ring-0'
            }
          `}
            placeholder="Digite sua senha"
            onChange={handlePasswordInput}
            value={passwordValue}
          />
        </div>
        <button
          onClick={handleButton}
          className={`
            font-semibold text-gray-yellow-cc-800 text-lg px-6 py-3 bg-white w-fit h-fit rounded-lg
            hover:bg-yellow-50
            shadow-inputs-checkouts-cc
            shadow-color-inputs-checkout-cc
          
          `}
        >
          Login
          {isLoadingLogin &&
            dataLogin?.email === emailValue &&
            isLoadingGetAllUserData &&
            dataGetAllUserData?.email === emailValue && <p>Loading</p>}
        </button>
      </div>
    </div>
  )
})
