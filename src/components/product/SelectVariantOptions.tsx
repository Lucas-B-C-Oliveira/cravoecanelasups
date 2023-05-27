import { useRef } from 'react'

interface Props {
  option: any[]
  setProductData: (productData: any) => void
  buttonWasClicked: boolean
  productId: string
  setOptionSelected: any
  options: any[]
  setQueryData: (queryData: string) => void
}

export function SelectVariantOptions({
  option,
  setProductData,
  buttonWasClicked,
  setOptionSelected,
  options,
  setQueryData,
}: Props) {
  const optionSelected = useRef('Selecione')

  function handleSelect(event: any) {
    const optionSelectedValue = event.target.value

    setOptionSelected((state: any) =>
      state.map((currentState: any) => {
        if (currentState.name === option?.name) {
          return {
            ...currentState,
            currentValue: optionSelectedValue,
          }
        }
        return {
          ...currentState,
        }
      }),
    )

    optionSelected.current = optionSelectedValue

    if (
      optionSelectedValue !== 'Selecione' &&
      options.at(-1).name === option.name
    ) {
      console.log('options', options)
      setQueryData('loading')
      // ? TODO: Faz a chamada a api

      /// Depois que receber os dados do produto
      setProductData('teste')
    }

    // ? TODO: Muda o estado global para os botões saberem
  }

  return (
    <div>
      <label
        htmlFor="select"
        className="text-sm font-semibold text-gray-yellow-cc-700"
      >
        {option.name}:
      </label>
      <select
        onChange={handleSelect}
        className={`
        w-full shadow-select-variant-product-options-cc
        shadow-color-select-variant-product-options-cc rounded-md
        border-0 px-2.5 py-1 text-sm font-medium text-gray-yellow-cc-700
        ring-inset focus:ring-2 focus:ring-hard-yellow-cc-500 sm:text-sm ${
          buttonWasClicked && optionSelected.current === 'Selecione'
            ? 'ring-red-500 ring-2'
            : ''
        }
          `}
        defaultValue={option.name}
      >
        <option>Selecione</option>

        {option.values.length > 0 &&
          option.values.map((optionValue: any) => {
            return <option key={optionValue}>{optionValue}</option>
          })}
      </select>
    </div>
  )
}
