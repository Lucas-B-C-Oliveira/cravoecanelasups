import { Breadcrumb } from './Breadcrumb'
import { CategoriesContent } from './CategoriesContent'
import { CategoryCheckbox } from './CategoryCheckbox'
import { PriceContent } from './PriceContent'
import { SearchContent } from './SearchContent'
import { SidebarClientContainer } from './SidebarClientContainer'

const categoriesMock = [
  {
    categoryLabel: 'Top 20',
  },
  {
    categoryLabel: 'Whey Protein',
  },

  {
    categoryLabel: 'Creatina',
  },

  {
    categoryLabel: 'Proteína',
  },
]
export async function Sidebar() {
  return (
    <div
      className={`
        w-96
        h-full
        bg-white
        rounded-xl
        p-6
        flex flex-col
        shadow-products-sidebar-cc
        shadow-color-products-sidebar-shadow-cc
        gap-6
      
      `}
    >
      {/* @ts-expect-error -> Async Server Component */}
      <Breadcrumb />
      <SidebarClientContainer />
    </div>
  )
}
