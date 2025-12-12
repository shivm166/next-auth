import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react'; 

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode; 
  backButton?: boolean;
  onBackClick?: () => void;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ 
  children, 
  title, 
  subtitle, 
  backButton, 
  onBackClick 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-[400px]">
        {backButton && (
          <div className="mb-6">
            {onBackClick ? (
              <button 
                onClick={onBackClick}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
            ) : (
              <Link 
                href="/login"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </Link>
            )}
          </div>
        )}
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && <div className="text-gray-500 text-sm leading-relaxed">{subtitle}</div>}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;