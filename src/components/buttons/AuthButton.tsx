// components/Button.tsx
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'text';

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseClasses =
    'w-full rounded-lg px-6 py-2 text-base font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-green-500 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:active:bg-gray-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
    text: 'bg-transparent text-blue-600 hover:text-blue-700 underline underline-offset-2 focus:ring-blue-500 active:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline dark:text-blue-400 dark:hover:text-blue-300 dark:active:text-blue-200',
  };

  const buttonClasses =
    `${baseClasses} ${variants[variant]} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Please wait...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
