interface IconProps {
  width: string
  height: string
  strokeWidth: string
}

export function User({ height, width, strokeWidth }: IconProps) {
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
          d="M 9 11.25 C 11.485 11.25 13.5 9.235 13.5 6.75 C 13.5 4.265 11.485 2.25 9 2.25 C 6.515 2.25 4.5 4.265 4.5 6.75 C 4.5 9.235 6.515 11.25 9 11.25 Z"
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
        />
        <path
          d="M 2.18 15.188 C 2.871 13.99 3.865 12.996 5.062 12.305 C 6.259 11.613 7.618 11.249 9 11.249 C 10.383 11.249 11.741 11.613 12.938 12.305 C 14.135 12.996 15.129 13.99 15.82 15.188"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
