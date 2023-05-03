import Link from 'next/link'
import { CartButton } from './cart/CartButton'
import { MainMenu } from './MainMenu/MainMenu'

export async function Header() {
  return (
    <>
      {/* <Link href="/">Home</Link>
      <CartButton /> */}
      <MainMenu />
    </>
  )
}
