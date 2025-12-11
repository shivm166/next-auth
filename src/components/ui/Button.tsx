import React from 'react'

interface buttonProps{
  children : React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  isLoading? : boolean
}

function Button({
  children,
  type,
  isLoading=false,
  ...props
} : buttonProps) {
  return (
    <button 
      type={type}
      className='w-full bg-secondary h-12 rounded-full text-[#92613A] text-base font-bold'
      disabled={isLoading}
      {...props}
    >
      {isLoading ?
        <div>
          ...Loading
        </div>
        :
        children
      }
    </button>
  )
}

export default Button