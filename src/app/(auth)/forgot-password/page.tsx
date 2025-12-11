"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import AuthWrapper from "@/components/AuthWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";

// Define the steps of the flow
type Step = 'EMAIL' | 'OTP' | 'PASSWORD' | 'SUCCESS';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('EMAIL');
  const [loading, setLoading] = useState(false);
  
  // Form Data
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- STEP 1: SEND EMAIL ---
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/forgot-password", { email });
      toast.success("Code sent!");
      setStep('OTP');
    } catch (error) {
      toast.error("User not found or error sending code");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: VERIFY OTP ---
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle OTP Input typing
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 4) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 5) {
      toast.error("Please enter a valid 5-digit code");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/verify-code", { email, code });
      toast.success("Code verified");
      setStep('PASSWORD');
    } catch (error) {
      toast.error("Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 3: RESET PASSWORD ---
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/reset-password", { email, password });
      setStep('SUCCESS');
    } catch (error) {
      toast.error("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER STEPS ---

  if (step === 'EMAIL') {
    return (
      <AuthWrapper 
        title="Forgot password" 
        subtitle="Please enter your email to reset the password" 
        backButton
      >
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <Input 
            label="Your Email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact@dscodetech.com"
            required
          />
          <Button type="submit" isLoading={loading}>Reset Password</Button>
        </form>
      </AuthWrapper>
    );
  }

  if (step === 'OTP') {
    return (
      <AuthWrapper 
        title="Check your email" 
        subtitle={
          <span>
            We sent a reset link to <b className="text-black">{email}</b> enter 5 digit code that mentioned in the email
          </span>
        }
        backButton
        onBackClick={() => setStep('EMAIL')}
      >
        <div className="space-y-8">
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { otpInputRefs.current[index] = el }} // Assign ref without returning it
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 ${digit ? 'border-blue-600 bg-white' : 'border-gray-200 bg-gray-50'}`}
              />
            ))}
          </div>

          <Button onClick={handleOtpSubmit} isLoading={loading}>Verify Code</Button>

          <p className="text-center text-sm text-gray-500">
            Haven't got the email yet?{" "}
            <button 
              type="button"
              onClick={handleEmailSubmit} 
              className="text-blue-600 font-semibold hover:underline"
            >
              Resend email
            </button>
          </p>
        </div>
      </AuthWrapper>
    );
  }

  if (step === 'PASSWORD') {
    return (
      <AuthWrapper 
        title="Set a new password" 
        subtitle="Create a new password. Ensure it differs from previous ones for security" 
        backButton
        onBackClick={() => setStep('OTP')}
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <Input 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Enter your new password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            rightIcon={showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
            onRightIconClick={() => setShowPassword(!showPassword)}
          />
          <Input 
            label="Confirm Password" 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Re-enter password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            rightIcon={showConfirmPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
            onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          <Button type="submit" isLoading={loading}>Update Password</Button>
        </form>
      </AuthWrapper>
    );
  }

  if (step === 'SUCCESS') {
    return (
      <AuthWrapper 
        title="Password reset" 
        subtitle="Your password has been successfully reset. Click confirm to set a new password"
        backButton
        onBackClick={() => router.push('/login')} // Assuming back on success goes to login
      >
        <Button onClick={() => router.push('/login')}>Confirm</Button>
      </AuthWrapper>
    );
  }

  return null;
}