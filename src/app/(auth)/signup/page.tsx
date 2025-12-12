"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", phone_no: "", password: "" });
  // - Add state for validation errors
  const [errors, setErrors] = useState({ email: "", phone_no: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // New validation function
  const validate = () => {
    const newErrors = { email: "", phone_no: "", password: "" };
    let isValid = true;

    // Email validation (simple check)
    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = "Please enter a valid email";
        isValid = false;
    }

    // Phone number validation (Must be 10 digits)
    if (!data.phone_no) {
      newErrors.phone_no = "Phone number is required";
      isValid = false;
    } else if (data.phone_no.length !== 10) {
      newErrors.phone_no = "Phone number must be exactly 10 digits";
      isValid = false;
    } else if (!/^\d+$/.test(data.phone_no)) {
        newErrors.phone_no = "Phone number must contain only numbers";
        isValid = false;
    }

    // Password validation (Must be at least 6 chars)
    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Run client-side validation first
    if (!validate()) {
        return; // Stop if there are errors
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/signup", data);
      if (response.data.success) {
        toast.success("Account created! Please Log in.");
        router.push("/login");
      }
    } catch (error: any) {
      // Handle server-side errors (e.g. user already exists)
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-[400px]">
        
        {/* Top Tab Switcher */}
        <div className="flex w-full mb-10 border-b border-gray-100">
          <Link href="/login" className="flex-1 flex justify-center pb-3 border-b-2 border-transparent cursor-pointer hover:text-gray-600">
            <span className="text-lg font-bold text-gray-300">Log in</span>
          </Link>
          <div className="flex-1 flex justify-center pb-3 border-b-2 border-blue-600 cursor-pointer">
            <span className="text-lg font-bold text-blue-600">Sign up</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Your Email" 
            type="email" 
            placeholder="Enter your email"
            value={data.email}
            // Update error state on change so red text goes away when fixing
            onChange={(e) => {
                setData({...data, email: e.target.value});
                if(errors.email) setErrors({...errors, email: ""});
            }}
            error={errors.email} // Pass error prop to Input component
            required
          />
          <Input 
            label="Phone Number" 
            type="tel" 
            placeholder="Enter your phone number"
            value={data.phone_no}
            onChange={(e) => {
                setData({...data, phone_no: e.target.value});
                if(errors.phone_no) setErrors({...errors, phone_no: ""});
            }}
            error={errors.phone_no} // Pass error prop to Input component
            required
          />
          <Input 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Create a password" 
            value={data.password}
            onChange={(e) => {
                setData({...data, password: e.target.value});
                if(errors.password) setErrors({...errors, password: ""});
            }}
            error={errors.password} // Pass error prop to Input component
            required
            rightIcon={showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
            onRightIconClick={() => setShowPassword(!showPassword)}
          />

          <Button type="submit" isLoading={loading} className="mt-4">
            Create Account
          </Button>
        </form>

        <div className="mt-8 mb-8">
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-300">Or</span>
          </div>
        </div>

        {/* Social Buttons (Unchanged) */}
        <div className="flex flex-col gap-4">
           <Button variant="outline" type="button">
             <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 3.57-1.62 1.57.07 2.8.74 3.78 1.95-3.35 1.76-2.79 6.75 1.25 8.5-.68 1.7-1.55 3.32-3.68 3.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.17 2.37-2.18 4.23-3.74 4.25z"/>
             </svg>
             Sign up with Apple
           </Button>

           <Button variant="outline" type="button">
             <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
             </svg>
             Sign up with Google
           </Button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}