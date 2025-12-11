"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import AuthWrapper from "@/components/AuthWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    await axios.post("/api/forgot-password", { email });
      setIsSent(true);
      toast.success("Reset link/code sent to your email");
    } catch (error) {
      toast.error("User not found or error sending code");
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <AuthWrapper title="Check your email" subtitle={`We sent a code to ${email}`} backButton>
        <div className="text-center space-y-6">
           {/* Here you would verify the OTP code in the next step */}
           <p className="text-sm text-gray-600">
             (Implementation for verifying code goes here - usually redirects to reset-password page)
           </p>
           <Button onClick={() => window.location.reload()} variant="outline">Resend Email</Button>
           
           <Link href="/login">
             <Button className="mt-4">Back to Login</Button>
           </Link>
        </div>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper title="Forgot password" subtitle="Please enter your email to reset the password" backButton>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Your Email" 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" isLoading={loading}>Reset Password</Button>
      </form>
    </AuthWrapper>
  );
}