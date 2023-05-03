interface IconProps {
  width: string
  height: string
  strokeWidth: string
}

export function ShoppingCartSimple({ height, width, strokeWidth }: IconProps) {
  return (
    <div className="cartButton" style={{ width, height }}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 47 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="cartButtonHardYellow"
          d="M 15.375 41.688 C 16.963 41.688 18.25 40.4 18.25 38.813 C 18.25 37.225 16.963 35.938 15.375 35.938 C 13.787 35.938 12.5 37.225 12.5 38.813 C 12.5 40.4 13.787 41.688 15.375 41.688 Z"
        />
        <path
          className="cartButtonHardYellow"
          d="M 34.063 41.688 C 35.65 41.688 36.938 40.4 36.938 38.813 C 36.938 37.225 35.65 35.938 34.063 35.938 C 32.475 35.938 31.188 37.225 31.188 38.813 C 31.188 40.4 32.475 41.688 34.063 41.688 Z"
        />

        <path
          className="cartButtonFill"
          d="M 8.601 12.938 H 40.837 L 36.093 29.541 C 35.924 30.143 35.561 30.674 35.061 31.05 C 34.561 31.427 33.952 31.629 33.326 31.625 H 16.112 C 15.486 31.629 14.876 31.427 14.376 31.05 C 13.876 30.674 13.514 30.143 13.345 29.541 L 6.84 6.792 C 6.754 6.492 6.572 6.227 6.323 6.039 C 6.073 5.851 5.769 5.75 5.456 5.75 H 2.438"
        />
        <path
          className="cartButtonStroke"
          d="M 8.601 12.938 H 40.837 L 36.093 29.541 C 35.924 30.143 35.561 30.674 35.061 31.05 C 34.561 31.427 33.952 31.629 33.326 31.625 H 16.112 C 15.486 31.629 14.876 31.427 14.376 31.05 C 13.876 30.674 13.514 30.143 13.345 29.541 L 6.84 6.792 C 6.754 6.492 6.572 6.227 6.323 6.039 C 6.073 5.851 5.769 5.75 5.456 5.75 H 2.438"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
