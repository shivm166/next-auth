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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Building2 size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Auth Application</span>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="!w-auto px-6 py-2 h-10 text-sm">
                      Dashboard
                    </Button>
                  </Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                    Log in
                  </Link>
                  <Link href="/signup">
                    <Button className="!w-auto px-6 py-2 h-10 text-sm shadow-blue-500/20">
                      Sign up free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
           

            <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
              <div className="relative rounded-2xl bg-gray-100/50 p-4 border border-gray-100 shadow-2xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-100 rounded"></div>
                        <div className="h-3 w-24 bg-gray-50 rounded"></div>
                      </div>
                      <div className="h-10 w-10 bg-blue-100 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-blue-50 rounded-xl border border-blue-100"></div>
                      <div className="h-24 bg-purple-50 rounded-xl border border-purple-100"></div>
                    </div>
                    <div className="h-4 w-full bg-gray-50 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-50 rounded"></div>
                  </div>
                </div>
                
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2025/26 shivamAll rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}