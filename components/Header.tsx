import React from 'react';
import { MessageSquareText } from 'lucide-react'; // Using a generic chat icon

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white p-4 shadow-lg flex items-center space-x-3">
      <MessageSquareText size={28} className="text-sky-200" /> {/* Slightly smaller icon */}
      <div>
        <h1 className="text-xl font-bold tracking-tight">Panasonic</h1> {/* Changed from text-2xl */}
        <p className="text-xs text-sky-100 font-light">Self-Help Assistant</p> {/* Changed from text-sm */}
      </div>
    </header>
  );
};

export default Header;