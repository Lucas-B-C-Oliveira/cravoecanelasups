import { memo, useState } from 'react'
import { FormData } from './Register'

interface Props {
  textLabel: string
  placeholder: string
  inputType: string
  inputName: string
  passwordValue?: any
  setFormData: (value: any) => void
}

export const InputContainer = memo(function InputContainer({
  setFormData,
  inputName,
  inputType,
  placeholder,
  textLabel,
  passwordValue = undefined,
}: Props) {
  console.log('InputContainer foi Chamado => ', inputName)
  const [passwordCheckValidate, setPasswordCheckValidate] = useState<
    undefined | boolean
  >(undefined)

  function handleInput(event: any) {
    const inputValue = event.target.value

    if (inputName !== 'passwordCheck') {
      setFormData((state: FormData) => {
        return {
          ...state,
          [inputName]: inputValue,
        }
      })
      return
    }

    if (inputValue !== passwordValue) {
      setPasswordCheckValidate(false)
      return
    }

    setPasswordCheckValidate(true)
    setFormData((state: FormData) => {
      return {
        ...state,
        [inputName]: inputValue,
      }
    })
  }

  return (
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
        {textLabel}
      </label>
      <input
        id={inputName}
        name=""
        type={inputType}
        onChange={handleInput}
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
            ${passwordCheckValidate === false ? 'ring-2 ring-red-500' : ''}

          `}
        placeholder={placeholder}
      />
    </div>
  )
})
