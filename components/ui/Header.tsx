
import React from 'react';
import { ArrowLeftIcon } from './Icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <header className="relative flex items-center justify-center p-4 bg-green-600 text-white shadow-md">
      {onBack && (
        <button onClick={onBack} className="absolute left-4 p-2 rounded-full hover:bg-green-700 transition-colors">
          <ArrowLeftIcon />
        </button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
