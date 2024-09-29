// Navbar.jsx
import React, { useState } from 'react';

export function Navbar () {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <button className="focus:outline-none">
            ☰
          </button>
        </div>

        {/* Main Menu */}
        <div className={`flex flex-col md:flex-row md:items-center absolute md:relative top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li className="p-2 hover:bg-blue-700 md:hover:bg-transparent">
              <a href="/" className="block">Home</a>
            </li>
            <li className="relative p-2 hover:bg-blue-700 md:hover:bg-transparent">
              <button className="focus:outline-none" onClick={() => toggleDropdown(1)}>
                Services ▼
              </button>
              {/* Dropdown Menu */}
              <ul className={`absolute left-0 bg-blue-700 p-2 mt-2 space-y-2 rounded shadow-md ${dropdownOpen === 1 ? 'block' : 'hidden'}`}>
                <li className="hover:bg-blue-600 p-2 rounded">
                  <a href="/">Web Development</a>
                </li>
                <li className="hover:bg-blue-600 p-2 rounded relative">
                  <button className="focus:outline-none" onClick={() => toggleDropdown(3)}>
                    Mobile Development ▼
                  </button>
                  {/* Submenu */}
                  <ul className={`absolute left-full top-0 mt-0 bg-blue-800 p-2 space-y-2 rounded shadow-md ${dropdownOpen === 3 ? 'block' : 'hidden'}`}>
                    <li className="hover:bg-blue-600 p-2 rounded">
                      <a href="/">iOS Development</a>
                    </li>
                    <li className="hover:bg-blue-600 p-2 rounded">
                      <a href="/">Android Development</a>
                    </li>
                  </ul>
                </li>
                <li className="hover:bg-blue-600 p-2 rounded">
                  <a href="/">SEO Optimization</a>
                </li>
              </ul>
            </li>
            <li className="p-2 hover:bg-blue-700 md:hover:bg-transparent">
              <a href="/">About Us</a>
            </li>
            <li className="p-2 hover:bg-blue-700 md:hover:bg-transparent">
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

