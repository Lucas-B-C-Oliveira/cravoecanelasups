import Image from 'next/image'
import LogoSvg from '../assets/Logo.svg'

import styles from './LogoMain.module.scss'

export function LogoMainMenu() {
  return <Image className={styles.imgContent} src={LogoSvg} alt="" />
}
