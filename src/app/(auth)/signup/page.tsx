"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import AuthWrapper from "@/components/AuthWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", phone_no: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/signup", data);
      if (response.data.success) {
        toast.success("Account created! Please Log in.");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper title="Create account" subtitle="Join CivilCare today">
       <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        <Link href="/login" className="flex-1 py-2 text-sm font-medium text-gray-500 text-center hover:text-gray-700">Log in</Link>
        <button className="flex-1 py-2 text-sm font-semibold bg-white shadow-sm rounded-lg text-gray-900">Sign up</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Email Address" 
          type="email" 
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
          required
        />
        <Input 
          label="Phone Number" 
          type="tel" 
          value={data.phone_no}
          onChange={(e) => setData({...data, phone_no: e.target.value})}
          required
        />
        <Input 
          label="Password" 
          type="password" 
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
          required
        />

        <Button type="submit" isLoading={loading}>Create Account</Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </AuthWrapper>
  );
}