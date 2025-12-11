import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightIcon, onRightIconClick, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-900 ml-1">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-5 py-4 rounded-2xl border bg-white 
              placeholder:text-gray-400 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
              transition-all duration-200 ease-in-out
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {rightIcon}
            </button>
          )}
        </div>
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;