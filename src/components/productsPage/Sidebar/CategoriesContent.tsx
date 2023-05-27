import { CategoryCheckbox } from './CategoryCheckbox'

interface Props {
  categories: any[]
}

export async function CategoriesContent({ categories }: Props) {
  return (
    <div
      className={`
      flex flex-col w-full gap-y-2
      
      `}
    >
      <h2
        className={`
        text-base text-gray-yellow-cc-750 font-medium
        `}
      >
        Categorias
      </h2>
      <div
        className={`
        flex flex-col gap-y-1
      `}
      >
        {categories.length > 0 &&
          categories.map((category: any) => {
            return (
              <>
                {/* @ts-expect-error -> Async Server Component */}
                <CategoryCheckbox
                  key={category.categoryLabel}
                  textLabel={category.categoryLabel}
                />
              </>
            )
          })}
      </div>
    </div>
  )
}
