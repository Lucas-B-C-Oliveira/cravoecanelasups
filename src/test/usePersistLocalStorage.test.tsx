import {
  ProductStateFrontEndData,
  usePersistLocalStorage,
} from '../store/persistLocalStorage'
import useStore from '../store/useStore'
import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'

import { it, expect } from 'vitest'

it('should ', () => {
  const TestComponent = () => {
    const cartData = useStore(usePersistLocalStorage, (state) => state.cartData)
    // resto do código do teste

    const { addProduct } = usePersistLocalStorage()

    const newProduct: ProductStateFrontEndData = {
      variant: {
        selectedOption: {
          name: 'Sabor',
          value: 'Banana',
        },
        variantId: 'variantId1',
      },
      altText: 'eae',
      currencyCode: 'BRL',
      currencySymbol: 'R$',
      description: 'muito bom esse whey',
      handle: 'hay',
      id: 'id do produto',
      image: 'https://imagemDoHay.com.br',
      options: [
        {
          name: 'Sabor',
          values: ['Banana'],
        },
      ],
      price: '10 reais',
      title: 'Hay do bom',
    }

    addProduct(newProduct)

    console.log('________________________cartData', cartData)

    return <pre>{JSON.stringify(cartData)}</pre>
  }

  const { debug } = render(<TestComponent />)
  debug()
})
