'use client'

import { useQuery } from '@tanstack/react-query'
import { memo, useRef, useState } from 'react'

interface Props {
  setUserEmailData?: (value: any) => void
}

function validateEmail(email: string) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

export const EmailContainer = memo(function EmailContainer({
  setUserEmailData: setUseData,
}: Props) {
  const [emailValue, setEmailValue] = useState('')
  const [userSearchDone, setUserSearchDone] = useState(false)
  const validEmail = useRef(true)

  const { isLoading } = useQuery({
    queryKey: ['userDataByEmail'],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_APPLICATION_PATH +
          process.env.NEXT_PUBLIC_APPLICATION_API_PATH +
          `/check-if-customer-exists-by-email?email=${emailValue}`,
      )

      const result = await response.json()

      return result
    },
    enabled: userSearchDone,
    onSuccess: (data) => {
      if (typeof setUseData !== 'undefined') {
        const existingUser = data.some(
          (element: any) => typeof element.email !== 'undefined',
        )

        const currentData = data[0]

        setUseData({
          existingUser,
          email: existingUser ? currentData.email : '',
          id: existingUser ? currentData.id : '',
        })
      }
    },
  })

  function handleButton() {
    if (validEmail.current === false || emailValue === '') return
    setUserSearchDone(true)
  }

  function handleInput(event: any) {
    const inputValue = event.target.value
    validEmail.current = validateEmail(inputValue)
    setEmailValue(inputValue)
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
            onChange={handleInput}
            value={emailValue}
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
          Continuar {isLoading && userSearchDone && <p>Loading</p>}
        </button>
      </div>
    </div>
  )
})
