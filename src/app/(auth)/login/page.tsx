"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import AuthWrapper from "@/components/AuthWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      toast.error("Invalid Credentials");
      setLoading(false);
    } else {
      toast.success("Login Successful");
      router.push("/dashboard");
    }
  };

  return (
    <AuthWrapper title="Log in" subtitle="Welcome back to CivilCare">
      {/* Design Tab Switcher UI */}
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        <button className="flex-1 py-2 text-sm font-semibold bg-white shadow-sm rounded-lg text-gray-900">Log in</button>
        <Link href="/signup" className="flex-1 py-2 text-sm font-medium text-gray-500 text-center hover:text-gray-700">Sign up</Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Your Email" 
          type="email" 
          placeholder="name@example.com"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        
        <div className="space-y-1.5">
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-xs text-blue-600 font-medium hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" isLoading={loading}>Log in</Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
           <Button variant="outline" type="button">
             <img src="/google-icon.svg" alt="" className="w-5 h-5" /> {/* Ensure you have an icon */}
             Login with Google
           </Button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </AuthWrapper>
  );
}