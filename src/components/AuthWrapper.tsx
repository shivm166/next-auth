import React from 'react';
import Link from 'next/link';

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backButton?: boolean; // For Forgot Password -> Login flow
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, title, subtitle, backButton }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
        {backButton && (
          <Link href="/login" className="text-gray-400 hover:text-gray-600 mb-6 block w-fit">
            ← Back
          </Link>
        )}
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;