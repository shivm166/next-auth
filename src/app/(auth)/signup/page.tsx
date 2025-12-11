import SignupForm from '@/components/SignupForm'

function signup() {
  return (
    <div className='bg-primary h-screen w-full grid grid-cols-2'>
        <div className='flex justify-center items-center overflow-hidden'>
          <div className='bg-secondary h-full w-full rounded-t-full ml-20 mr-65 mt-75'>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <SignupForm />
        </div>
    </div>
  )
}

export default signup