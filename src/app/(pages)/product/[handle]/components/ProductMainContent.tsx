import { AddToCart } from './Buttons/AddToCart'
import { Buy } from './Buttons/Buy'
import { SelectVariantOption } from './SelectVariantOption'

interface Props {
  productData: any
}

export async function ProductMainContent({ productData }: Props) {
  const { price, title, currencySymbol, options } = productData

  // console.log('productData', productData)

  const priceWithTwoZeros = Number(price).toFixed(2)
  const priceWithComma = priceWithTwoZeros.replace('.', ',')

  return (
    <div
      className={`
      flex flex-col gap-2.5 justify-start justify-items-start items-start h-fit w-fit
    
    `}
    >
      <p
        className={`
        text-2xl
        text-gray-yellow-cc-900 font-bold
      
      `}
      >
        {title}
      </p>
      <a
        className={`
        font-bold text-gray-yellow-cc-750 text-xs underline
      `}
        href="#nutrition-table"
      >
        Tabela Nutricional
      </a>
      <p
        className={`
      text-2xl font-bold text-gray-yellow-cc-850
      
      `}
      >
        {currencySymbol}
        {priceWithComma}
      </p>

      {options.length > 0 &&
        options.map((option: any) => {
          return <SelectVariantOption key={option.name} option={option} />
        })}

      <Buy productData={productData} />
      <AddToCart productData={productData} />
      <p
        className={`
      text-sm font-semibold text-gray-yellow-cc-750
      
      `}
      >
        EM ESTOQUE
      </p>
    </div>
  )
}
