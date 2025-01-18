import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="EraseEaseBG Logo" className="h-8 w-auto" />
              <h1 className="ml-2 text-xl font-bold text-gray-800">EraseEaseBG</h1>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link>
          </div>

          <div className="hidden md:block">
            <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link>
              <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
