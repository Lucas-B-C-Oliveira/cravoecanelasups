import { ButtonsMainMenu } from './ButtonsMainMenu'
import { LogoMainMenu } from './Logo/LogoMainMenu'
import { SearchMainMenu } from './Search/SearchMainMenu'

export async function MainMenu() {
  return (
    <nav
      className={`
      md:px-6 md:py-8 md:gap-5 md:h-max-8 md:h-fit md:w-full 
      lg:px-8 lg:py-8 lg:gap-6 lg:h-max-8 lg:h-fit lg:w-full 
      xl:px-28 xl:py-8 xl:gap-12 xl:h-max-8 xl:h-fit xl:w-full  
      2xl:px-28 2xl:py-8 2xl:gap-12 2xl:h-max-8 2xl:h-fit 2xl:w-full  
      px-4 py-4  h-fit w-full bg-gray-yellow-cc-900 flex items-center justify-between
      `}
      aria-label="Global"
    >
      {/* @ts-expect-error */}
      <LogoMainMenu />
      <SearchMainMenu />
      <ButtonsMainMenu />
    </nav>
  )
}
