import React, { useState } from "react";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Site Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Photography Showcase</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#gallery" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Gallery
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <a href="#home" className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#gallery" className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Gallery
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 