import LoginForm from '@/components/LoginForm'
import React from 'react'

function login() {
  return (
    <div className='bg-primary h-screen w-full grid grid-cols-2'>
        <div className='flex justify-center items-center'>
          <LoginForm />
        </div>
        <div className='flex justify-center items-center overflow-hidden'>
          <div className='bg-secondary h-full w-full rounded-t-full mr-20 ml-65 mt-75'>
          </div>
        </div>
    </div>
  )
}

export default login