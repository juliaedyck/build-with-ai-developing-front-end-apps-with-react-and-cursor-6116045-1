import React, { useState } from "react";
import NavLinks from "./NavLinks";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-100 text-gray-900 p-4 shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        {/* Site Title with Camera Icon */}
        <div className="flex items-center space-x-3 font-extrabold text-2xl tracking-tight">
          <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="13" r="3.5" strokeWidth="2" stroke="currentColor" fill="none" />
            <rect x="2" y="7" width="20" height="13" rx="3" strokeWidth="2" stroke="currentColor" fill="none" />
            <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" stroke="currentColor" fill="none" />
          </svg>
          <span>Photography Showcase</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <NavLinks orientation="horizontal" />
        </nav>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-center focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-3 flex flex-col space-y-2 mt-2 rounded-b-xl shadow-sm">
          <NavLinks orientation="vertical" />
        </nav>
      )}
    </header>
  );
};

export default Header; 