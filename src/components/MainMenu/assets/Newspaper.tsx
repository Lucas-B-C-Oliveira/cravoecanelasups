interface IconProps {
  width: string
  height: string
  strokeWidth: string
}

export function Newspaper({ height, width, strokeWidth }: IconProps) {
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
          d="M 6.75 7.875 H 12.375"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 6.75 10.125 H 12.375"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 2.25 14.063 C 2.548 14.063 2.835 13.944 3.046 13.733 C 3.256 13.522 3.375 13.236 3.375 12.938 V 4.5 C 3.375 4.351 3.434 4.208 3.54 4.102 C 3.645 3.997 3.788 3.938 3.938 3.938 H 15.188 C 15.337 3.938 15.48 3.997 15.585 4.102 C 15.691 4.208 15.75 4.351 15.75 4.5 V 12.938 C 15.75 13.236 15.632 13.522 15.421 13.733 C 15.21 13.944 14.923 14.063 14.625 14.063 H 2.25 Z"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 2.25 14.063 C 1.952 14.063 1.665 13.944 1.455 13.733 C 1.244 13.522 1.125 13.236 1.125 12.938 V 6.188"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
