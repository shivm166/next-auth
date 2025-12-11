import React from 'react'

interface inputProps{
  label: string,
  type?: string,
  icon: React.ReactNode,
  placeholder: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Input = ({
  label,
  type="text",
  icon,
  placeholder,
  value,
  onChange
}: inputProps) => {
  return (
    <>
    <div className='w-full'>
      <label className='relative top-3.5 left-9 px-2 bg-primary text-[#757575]'>{label}</label>
      <div className='flex border-2 border-[#757575] rounded-full'>
        <div className='flex items-center justify-center'>
          <div className="pl-4 text-[#616161]">
            {icon}
          </div>
        </div>
        <input 
          type={type} 
          placeholder={placeholder} 
          className='p-4 pl-7 outline-none rounded-full text-[#616161]'
          value={value}
          onChange={onChange} 
        />
      </div>
    </div>
    </>
  )
}

export default Input