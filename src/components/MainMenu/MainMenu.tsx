import { ButtonMainMenu } from './Button/ButtonMainMenu'
import { LogoMainMenu } from './Logo/LogoMainMenu'

import style from './MainMenu.module.scss'
import { SearchMainMenu } from './Search/SearchMainMenu'

export function MainMenu() {
  return (
    <>
      <div className={style.mainMenuContent}>
        <LogoMainMenu />

        <SearchMainMenu />
        <div className={style.buttonsContent}>
          <ButtonMainMenu product />
          <ButtonMainMenu contact />
          <ButtonMainMenu blog />
          <ButtonMainMenu physicalStores />
          <ButtonMainMenu enter />
          <ButtonMainMenu cart />
        </div>
      </div>
    </>
  )
}
