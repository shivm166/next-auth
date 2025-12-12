"use client";
import { useEffect, useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [verified, setVerified] = useState(null);

  const hasUser = (s) => !!(s?.user?.email || s?.user?.id || s?.user?.name);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (status === "loading") {
        if (mounted) setVerified(null);
        return;
      }
      if (status !== "authenticated") {
        if (mounted) setVerified(false);
        return;
      }
      if (hasUser(session)) {
        if (mounted) setVerified(true);
        return;
      }
      try {
        const s = await getSession();
        if (mounted) setVerified(hasUser(s));
      } catch {
        if (mounted) setVerified(false);
      }
    })();
    return () => (mounted = false);
  }, [status, session]);

  if (verified === null) {
    return (
      <div className="min-h-screen bg-gray-300 font-sans">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur border-b z-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="text-lg font-semibold">Auth Application</div>
              <div className="h-8" />
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-lg font-semibold text-black">Auth Application</div>
            <div className="flex items-center gap-3 text-black">
              {!verified ? (
                <>
                  <Link href="/login" className="text-sm hidden sm:inline">Log in</Link>
                  <Link href="/signup" className="text-sm hidden sm:inline">Sign up</Link>
                  <Link href="/login" className="inline sm:hidden text-sm">Get started</Link>
                </>
              ) : (
                <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex items-center gap-2 text-sm">
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
