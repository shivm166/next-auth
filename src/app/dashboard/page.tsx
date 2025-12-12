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

  
    </div>
  );
}