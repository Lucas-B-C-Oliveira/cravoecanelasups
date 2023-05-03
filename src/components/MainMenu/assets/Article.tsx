interface IconProps {
  width: string
  height: string
  strokeWidth: string
}

export function Article({ height, strokeWidth, width }: IconProps) {
  return (
    <div style={{ width, height }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 15.188 3.375 H 2.813 C 2.502 3.375 2.25 3.627 2.25 3.938 V 14.063 C 2.25 14.373 2.502 14.625 2.813 14.625 H 15.188 C 15.498 14.625 15.75 14.373 15.75 14.063 V 3.938 C 15.75 3.627 15.498 3.375 15.188 3.375 Z"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 5.344 6.469 H 12.656"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 5.344 9 H 12.656"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 5.344 11.531 H 12.656"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
