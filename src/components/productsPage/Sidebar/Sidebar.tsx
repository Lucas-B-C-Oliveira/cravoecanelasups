import { Breadcrumb } from './Breadcrumb'
import { CategoriesContent } from './CategoriesContent'
import { PriceContent } from './PriceContent'
import { SearchContent } from './SearchContent'

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
      {/* @ts-expect-error -> Async Server Component */}
      <SearchContent />
      <PriceContent />
      {/* @ts-expect-error -> Async Server Component */}
      <CategoriesContent categories={categoriesMock} />
    </div>
  )
}
