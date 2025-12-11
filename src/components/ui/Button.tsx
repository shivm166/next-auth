import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className, 
  ...props 
}) => {
  const baseStyles = "w-full py-4 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-3 text-[15px]";
  
  const variants = {
    // Matches the "Continue" blue button
    primary: "bg-[#4F46E5] hover:bg-[#4338ca] text-white shadow-md shadow-blue-200", 
    // Matches the Social buttons
    outline: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
    ghost: "bg-transparent text-blue-600 hover:text-blue-700 hover:bg-blue-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </button>
  );
};

export default Button;