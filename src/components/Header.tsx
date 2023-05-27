import { MainMenu } from './MainMenu/MainMenu'

export async function Header() {
  return (
    <>
      {/* @ts-expect-error -> Async Server Component */}
      <MainMenu />
    </>
  )
}
