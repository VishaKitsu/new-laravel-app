import React from 'react'

const colorStyles = {
  blue: "bg-linear-to-b from-sky-300 to-sky-400 to-70% text-sky-950 ring-sky-500 text-shadow-sky-300 hover:from-sky-300/80 dark:ring-sky-500/50",
  green: "bg-linear-to-b from-green-300 to-green-400 to-70% text-green-950 ring-green-500 text-shadow-green-300 hover:from-green-300/80 dark:ring-green-500/50",
  red: "bg-linear-to-b from-red-300 to-red-400 to-70% text-red-950 ring-red-500 text-shadow-red-300 hover:from-red-300/80 dark:ring-red-500/50",
  white: "bg-secondary bg-linear-to-b from-white/10 to-white/20 to-70% text-gray-950 ring-black/20 inset-shadow-white/10 hover:from-white hover:to-white/10 dark:text-white dark:text-shadow-2xs text-shadow-none"
} as const

type ColorKey = keyof typeof colorStyles

interface MyButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode
  color?: ColorKey
}

function MyButton({ children, color = "blue", ...props }: MyButtonProps) {
  const baseStyles = "rounded-md px-4 py-2 text-sm font-semibold shadow-md ring inset-shadow-2xs inset-shadow-white/20 transition text-shadow-2xs"
  
  return (
    <button 
      className={`${baseStyles} ${colorStyles[color]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default MyButton