interface IconProps {
  width: string
  height: string
  strokeWidth: string
}

export function MapPin({ height, width, strokeWidth }: IconProps) {
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
          d="M 9 9.563 C 10.243 9.563 11.25 8.555 11.25 7.313 C 11.25 6.07 10.243 5.063 9 5.063 C 7.757 5.063 6.75 6.07 6.75 7.313 C 6.75 8.555 7.757 9.563 9 9.563 Z"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 14.625 7.313 C 14.625 12.375 9 16.313 9 16.313 C 9 16.313 3.375 12.375 3.375 7.313 C 3.375 5.821 3.968 4.39 5.023 3.335 C 6.077 2.28 7.508 1.688 9 1.688 C 10.492 1.688 11.923 2.28 12.978 3.335 C 14.032 4.39 14.625 5.821 14.625 7.313 V 7.313 Z"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
