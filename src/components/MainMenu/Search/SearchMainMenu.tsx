'use client'

export function SearchMainMenu() {
  //! TODO:  need implement outline when input is active or selected and remove "outline-red-500"
  return (
    <div
      className={`
      sm:
      md:
      lg:
      xl:flex
      2xl:flex
      pr-[1rem]
      hidden items-center justify-between gap-2.5 h-fit w-96 rounded-lg bg-white focus:outline active:outline outline-2 outline-hard-yellow-cc-500
      `}
    >
      <input
        className="w-full px-4 py-1 rounded-md border-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        type="search"
        placeholder="Busque por um produto..."
      />
      <button>
        <svg
          className="w-5 h-5 stroke-gray-yellow-cc-750"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5625 15.625C13.1869 15.625 16.125 12.6869 16.125 9.0625C16.125 5.43813 13.1869 2.5 9.5625 2.5C5.93813 2.5 3 5.43813 3 9.0625C3 12.6869 5.93813 15.625 9.5625 15.625Z"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.2031 13.7031L18 17.5"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
