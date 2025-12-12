"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur border-b z-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="text-lg font-semibold text-gray-900">Auth Application</div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center h-screen pt-16">
            <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-lg font-semibold text-black">Auth Application</div>
            <div className="flex items-center gap-4 text-black">
              {status === "unauthenticated" ? (
                <>
                  <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors ">
                    Log in
                  </Link>
                  <Link href="/signup" className="text-sm font-medium hover:text-blue-600 transition-colors ">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <div className="sm:flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} />
                    <span>{session?.user?.email}</span>
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })} 
                    className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
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