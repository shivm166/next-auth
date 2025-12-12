"use client";
import { useEffect, useMemo, useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [isVerifiedLoggedIn, setIsVerifiedLoggedIn] = useState(null);

  const hasMeaningfulUser = (s) => {
    if (!s) return false;
    return !!(s.user?.email || s.user?.id || s.user?.name);
  };

  useEffect(() => {
    let mounted = true;

    async function revalidate() {
      if (status === "loading") {
        return;
      }

      if (status !== "authenticated") {
        if (mounted) setIsVerifiedLoggedIn(false);
        return;
      }
      try {
        const s = await getSession();
        const ok = hasMeaningfulUser(s);
        if (mounted) setIsVerifiedLoggedIn(ok);
      } catch (err) {
        console.error("Error revalidating session:", err);
        if (mounted) setIsVerifiedLoggedIn(false);
      }
    }

    revalidate();
    return () => {
      mounted = false;
    };
  }, [status]);

  if (isVerifiedLoggedIn === null) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Auth Application
                </span>
              </div>
              <div className="flex items-center gap-4">
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  const isLoggedIn = isVerifiedLoggedIn;

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Auth Application
              </span>
            </div>

            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Link href="/login" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Log in</Link>
                  <Link href="/signup" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Sign up</Link>
                </>
              ) : (
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
