interface Props {
  text: string
}

export async function Separator({ text }: Props) {
  return (
    <div
      className={`

        w-full
        h-14
        rounded-lg
        bg-gradient-to-t from-gradient-yellow-cc-600 from-10% to-gradient-yellow-cc-500
        flex flex-row items-center justify-center
      `}
    >
      <h1
        className={`
        font-bold text-3xl text-gray-yellow-cc-900
      `}
      >
        {text}
      </h1>
    </div>
  )
}
