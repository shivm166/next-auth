"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Building2, ShieldCheck, Users, ArrowRight, LogOut } from "lucide-react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              
              <span className="text-xl font-bold text-gray-900 tracking-tight">Auth Application</span>
            </div>

            <div className="flex items-center gap-4">
              {! isLoggedIn ? (
                <>
                  <Link href="/login" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                    Log in
                  </Link>
                  <Link href="/signup" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                      Sign up
                  </Link>
                </>
                
              ) : (

                <>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </> 
              )}
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}