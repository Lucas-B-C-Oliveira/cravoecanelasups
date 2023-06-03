import { MainMenu } from './MainMenu/MainMenu'

export async function Header() {
  return (
    <>
      <div className='min-[950px]:fixed inset-0 z-50 min-[950px]:h-[7rem]'>
        {/* @ts-expect-error -> Async Server Component */}
        <MainMenu />
      </div>
    </>
  )
}
