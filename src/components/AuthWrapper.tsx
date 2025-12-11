import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react'; // Assuming you have lucide-react, or use an svg

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode; // Changed to ReactNode to allow bold email text
  backButton?: boolean;
  onBackClick?: () => void; // New prop for custom back action
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
        {/* Back Button Logic */}
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