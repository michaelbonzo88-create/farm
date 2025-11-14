
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "w-full text-center font-bold py-3 px-4 rounded-xl transition-transform duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    secondary: 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500',
    outline: 'bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
