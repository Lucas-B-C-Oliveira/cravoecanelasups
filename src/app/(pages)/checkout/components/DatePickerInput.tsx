import { InputHTMLAttributes, memo, useRef, useState } from 'react'
import { FormData } from './Register'
import Datepicker from 'tailwind-datepicker-react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useFormContext } from 'react-hook-form'

interface Props {
  textLabel: string
  inputName: string
  setFormData: (value: any) => void
}

const currentDate = new Date()

const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  theme: {
    background: `bg-white`,
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: 'text-gray-yellow-cc-900',
    disabledText: 'text-gray-yellow-cc-500',
    input: `px-3.5 py-3 rounded-lg bg-white text-sm text-gray-yellow-cc-750 font-medium
    outline-none border-0 w-full h-fit focus:outline-none focus:ring-2 focus:ring-gray-yellow-cc-600
    `,
    inputIcon: 'hidden',
    selected: 'text-white bg-gray-yellow-cc-500',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <CaretLeft />,
    next: () => <CaretRight />,
  },
  datepickerClassNames: 'top-12',
  defaultDate: currentDate,
  language: 'br',
  inputNameProp: 'birthDate',
  weekDays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
}

function dateFormat(selectedDate: Date) {
  const day = selectedDate.getDate()
  const months = selectedDate.getMonth() + 1
  const year = selectedDate.getFullYear()

  const dayFormated = day < 10 ? '0' + day : day
  const monthFormated = months < 10 ? '0' + months : months

  const dateFormated = dayFormated + '/' + monthFormated + '/' + year
  return dateFormated
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const DatePickerInput = memo(function DatePickerInput(
  props: InputProps,
) {
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')
  const { register, setValue, trigger } = useFormContext()

  const handleFunction = (selectedDate: Date) => {
    const dateFormated = dateFormat(selectedDate)
    setValue(props.name, dateFormated)
    trigger(props.name)
    setInputValue(dateFormated)
  }

  const handleClose = (state: boolean) => {
    setShow(state)
  }

  return (
    <Datepicker
      onChange={handleFunction}
      options={options}
      show={show}
      setShow={handleClose}
    >
      <input
        className=" px-3.5 py-3 rounded-lg bg-white  shadow-inputs-checkouts-cc shadow-color-inputs-checkout-cc 
          focus:outline-none focus:ring-2 focus:ring-gray-yellow-cc-600
          outline-none border-0 w-full h-fit text-sm text-gray-yellow-cc-750 font-medium"
        type="text"
        {...register(props.name)}
        value={inputValue}
        onFocus={() => setShow(true)}
        {...props}
      />
    </Datepicker>
  )
})
