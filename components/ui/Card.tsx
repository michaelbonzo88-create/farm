
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div
      onClick={onClick}
      className={`bg-white p-6 rounded-2xl shadow-md ${clickableClasses} ${className}`}
    >
      {children}
    </div>
  );
};
