"use client";
import { useSession, signOut } from "next-auth/react";
import { User } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navbar / Header */}
      <nav className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900">CivilCare</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-right hidden sm:block">
            <p className="font-semibold text-gray-900">{session?.user?.email}</p>
            <p className="text-gray-500 text-xs">User ID: {session?.user?.id}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={20} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome Back! 👋
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            You have successfully logged in. This is your protected dashboard where you can manage your account and view project details.
          </p>
          
          <div className="w-full max-w-[200px] mx-auto">
            <Button onClick={handleLogout} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Profile Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{session?.user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{session?.user?.phone_no || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Account Status</h3>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-600 font-medium text-sm">Active Session</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Your session is currently active and secure.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}