interface Props {
  textLabel: string
}

export async function CategoryCheckbox({ textLabel }: Props) {
  return (
    <div
      className={`
        flex flex-row gap-2 items-center
      `}
    >
      <input
        type="checkbox"
        id="meuCheckbox"
        className={`
        rounded-sm
      `}
      />
      <label
        className={`
        font-medium text-gray-yellow-cc-800 text-base
      `}
        htmlFor="categoryCheckbox"
      >
        {textLabel}
      </label>
    </div>
  )
}

//! TODO: Need chose a beter id and htmlfor
