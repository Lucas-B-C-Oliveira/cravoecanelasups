interface IconProps {
  width: string
  height: string
  strokeWidth: string
}

export function MagnifyingGlass({ height, strokeWidth, width }: IconProps) {
  return (
    <div style={{ width, height }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 9.063 15.625 C 12.687 15.625 15.625 12.687 15.625 9.063 C 15.625 5.438 12.687 2.5 9.063 2.5 C 5.438 2.5 2.5 5.438 2.5 9.063 C 2.5 12.687 5.438 15.625 9.063 15.625 Z"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 13.703 13.703 L 17.5 17.5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
