import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Bell } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Safe Route', path: '/safe-route' },
    { name: 'Emergency', path: '/emergency' },
    { name: 'Resources', path: '/resources' },
    { name: 'Helpline', path: '/helpline' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-primary-700' 
                    : 'text-gray-700 hover:text-primary-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                <Bell size={20} />
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
                Login
              </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 pt-20">
          <nav className="container mx-auto px-4 flex flex-col space-y-6 py-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-xl font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-primary-700' 
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link 
                to="/login" 
                className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center px-4 py-3 rounded-md transition-colors"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;