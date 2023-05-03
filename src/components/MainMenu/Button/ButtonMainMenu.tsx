'use client'
import { Article } from '../assets/Article'
import { MapPin } from '../assets/MapPin'
import { Newspaper } from '../assets/Newspaper'
import { Phone } from '../assets/Phone'
import { User } from '../assets/User'
import styles from './ButtonMainMenu.module.scss'
import { ShoppingCartSimple } from '../assets/ShoppingCartSimples'

enum ButtonText {
  PRODUCTS = 'Produtos',
  CONTACT = 'Contato',
  BLOG = 'Blog',
  PHYSICAL_STORES = 'Lojas Físicas',
  ENTER = 'Entrar',
  CART = 'Cart',
}

interface Props {
  product?: boolean
  contact?: boolean
  blog?: boolean
  physicalStores?: boolean
  enter?: boolean
  cart?: boolean
}

export function ButtonMainMenu({
  product,
  contact,
  blog,
  physicalStores,
  enter,
  cart,
}: Props) {
  function onClickProducts() {
    console.log('productClicked')
  }

  return (
    <>
      {product && (
        <button onClick={onClickProducts} className={styles.content}>
          <p>{ButtonText.PRODUCTS}</p>
          <Article width="18px" height="18px" strokeWidth="1.6" />
        </button>
      )}

      {contact && (
        <button onClick={onClickProducts} className={styles.content}>
          <p>{ButtonText.CONTACT}</p>
          <Phone width="18px" height="18px" strokeWidth="1.6" />
        </button>
      )}

      {blog && (
        <button onClick={onClickProducts} className={styles.content}>
          <p>{ButtonText.BLOG}</p>
          <Newspaper width="18px" height="18px" strokeWidth="1.6" />
        </button>
      )}

      {physicalStores && (
        <button onClick={onClickProducts} className={styles.content}>
          <p>{ButtonText.PHYSICAL_STORES}</p>
          <MapPin width="18px" height="18px" strokeWidth="1.6" />
        </button>
      )}

      {enter && (
        <button onClick={onClickProducts} className={styles.content}>
          <p>{ButtonText.ENTER}</p>
          <User width="18px" height="18px" strokeWidth="1.6" />
        </button>
      )}

      {cart && (
        <button onClick={onClickProducts} className={styles.content}>
          <ShoppingCartSimple width="46px" height="46px" strokeWidth="4.84" />
        </button>
      )}
    </>
  )
}
