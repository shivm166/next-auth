"use client"
import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { LockKeyhole, Mail, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast from 'react-hot-toast'

function SignupForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)

        if (!email || password || phoneNo){
            setIsLoading(false)
            setError("All fields are required")
        }

        try {
            const response = await axios.post("http://localhost:3000/api/signup", {email: email, phone_no:phoneNo, password})

            toast.success(response.data.message)
            setEmail("")
            setPhoneNo("")
            setPassword("")
            router.push("/login")
            router.refresh()
        } catch (error: any) {
            console.log(error)
            setError(error)
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h3 className='text-3xl font-extrabold text-heading'>Create Account</h3>

            <form action="" onSubmit={handleSubmit}>
                <Input 
                    label='Email' 
                    icon={<Mail />} 
                    placeholder='email@gmail.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value) } 
                />

                <Input 
                    label='Phone no' 
                    icon={<Phone />} 
                    placeholder='Enter Your Phone No' 
                    value={phoneNo} 
                    onChange={(e) => setPhoneNo(e.target.value)} 
                />

                <Input 
                    label='Password'
                    type='password'
                    icon={<LockKeyhole />} 
                    placeholder='Enter Your Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <Button type='submit' isLoading={isLoading}>
                    Create Account
                </Button>
            </form>

            {/* {error && 
                <p className='text-red-50'>{error}</p>
            } */}
        </div>
    )
}

export default SignupForm