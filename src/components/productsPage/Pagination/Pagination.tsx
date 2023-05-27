'use client'

interface Props {
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export function Pagination({ hasNextPage, hasPreviousPage }: Props) {
  return (
    <div
      className={`
      flex flex-row h-fit w-full gap-6 justify-center
    `}
    >
      {hasPreviousPage && (
        <button
          className={`
        text-base
        text-gray-yellow-cc-850
        font-semibold
      `}
        >
          Página Anterior
        </button>
      )}

      {hasNextPage && (
        <button
          className={`
        text-base
        text-gray-yellow-cc-850
        font-semibold
      `}
        >
          Próxima Página
        </button>
      )}
    </div>
  )
}
