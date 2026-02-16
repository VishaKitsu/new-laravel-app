import React from 'react'
import { Button } from '@headlessui/react'

const colorStyles = {
  blue: "bg-linear-to-b from-sky-300 to-sky-400 to-70% text-sky-950 ring-sky-500 text-shadow-sky-300 hover:from-sky-300/90 hover:to-sky-400/80 dark:ring-sky-500/50 text-shadow-2xs",
  green: "bg-linear-to-b from-green-300 to-green-400 to-70% text-green-950 ring-green-500 text-shadow-green-300 hover:from-green-300/80 dark:ring-green-500/50 text-shadow-2xs",
  orange: "bg-linear-to-b from-orange-300 to-orange-400 to-70% text-orange-950 ring-orange-500 text-shadow-orange-300 hover:from-orange-300/90 hover:to-orange-400/80 dark:ring-orange-500/50 text-shadow-2xs",
  red: "bg-linear-to-b from-red-300 to-red-400 to-70% text-red-950 ring-red-500 text-shadow-red-300 hover:from-red-300/80 dark:ring-red-500/50 text-shadow-2xs",
  white: "bg-secondary bg-linear-to-b from-white/10 to-white/20 to-70% text-gray-950 ring-black/20 inset-shadow-white/10 hover:from-white hover:to-white/10 dark:text-white dark:text-shadow-2xs text-shadow-none"
} as const

type ColorKey = keyof typeof colorStyles

interface MyButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode
  color?: ColorKey
}

function MyButton({ children, className, color = "blue", ...props }: MyButtonProps) {
  const baseStyles = "rounded-md px-4 py-2 text-sm font-semibold shadow-md ring inset-shadow-2xs inset-shadow-white/20 transition"
  
  return (
    <Button 
      className={`${baseStyles} ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

export default MyButton