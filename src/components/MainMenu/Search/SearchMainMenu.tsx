import { MagnifyingGlass } from '../assets/MagnifyingGlass'
import styles from './SearchMainMenu.module.scss'

export function SearchMainMenu() {
  return (
    <div className={styles.searchBox}>
      <input type="search" placeholder="Busque por um produto..." />
      <button>
        <MagnifyingGlass height="20px" width="20px" strokeWidth="2.6" />
      </button>
    </div>
  )
}
