import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-indigo-600 transition-all duration-300 group-hover:scale-110" />
              <CheckCircle className="h-4 w-4 text-green-500 absolute -bottom-1 -right-1 transform transition-all duration-300 group-hover:scale-125" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800 leading-none">AppSafety</span>
              <span className="text-xs text-indigo-600 font-medium">Secure Gaming</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/app-checker" className="text-gray-600 hover:text-indigo-600">
              App Checker
            </Link>
            <Link to="/risk-calculator" className="text-gray-600 hover:text-indigo-600">
              Risk Calculator
            </Link>
            <Link to="/gaming-guide" className="text-gray-600 hover:text-indigo-600">
              Gaming Guide
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}