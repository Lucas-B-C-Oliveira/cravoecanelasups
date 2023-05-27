import { ArrowCircleRightBuyNowButtonIcon } from '@/components/Icons'
import { ProductData } from '@/types'

interface Props {
  productData?: ProductData | any
  setButtonWasClicked: (value: boolean) => void
  optionSelected: any[]
}

export function BuyNow({
  productData,
  setButtonWasClicked,
  optionSelected,
}: Props) {
  // const addProductToCart = useGlobalStore((state) => state.addProductToCart)

  function handleBuyNow() {
    console.log('optionSelected', optionSelected)

    const voidOption = optionSelected.some(
      (option) => option.currentValue === 'Selecione',
    )
    console.log('voidOption', voidOption)

    if (voidOption) {
      setButtonWasClicked(true)
    } else {
      if (typeof productData !== 'undefined') {
        console.log('Entrou no if')
      }
    }
  }

  return (
    <button
      className={`
      rounded-lg 
      flex flex-row flex-nowrap gap-1 w-fit h-fit
      bg-gradient-to-t from-gradient-yellow-cc-600 from-5% to-gradient-yellow-cc-500
      text-base font-semibold text-gray-yellow-cc-800
      px-2.5 py-1.5
      items-center      
    `}
      onClick={handleBuyNow}
    >
      <ArrowCircleRightBuyNowButtonIcon />
      Comprar Agora
    </button>
  )
}
