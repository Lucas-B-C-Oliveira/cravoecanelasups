export function SearchContent() {
  return (
    <>
      <h2
        className={`
          text-gray-yellow-cc-850
          font-semibold
          text-base
        `}
      >
        Conteúdo da Busca:
      </h2>
      <p
        className={`
          text-gray-yellow-cc-800
          font-regular
          text-base
          
          `}
      >
        aaa
      </p>
      <button
        onClick={() => console.log('eae')}
        className={`
      group whitespace-nowrap  text-base px-2.5 py-1.5
      flex flex-row  gap-1.5  active:text-hard-yellow-cc-500 hover:text-hard-yellow-cc-500
      text-gray-yellow-cc-800 font-semibold items-center
      bg-gradient-to-t from-gradient-yellow-cc-600 from-10% to-gradient-yellow-cc-500 to-90% rounded-lg
      `}
      >
        Buscar Produtos
        {/* {icon &&
          cloneElement(icon, {
            className:
              'stroke-yellow-cc-200 w-5 h-5 group-hover:stroke-hard-yellow-cc-500 group-active:stroke-hard-yellow-cc-500',
          })} */}
      </button>
    </>
  )
}
