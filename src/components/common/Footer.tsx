import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <Logo />
            <p className="mt-4 text-gray-300">
              Empowering women with technology to enhance their safety and security in everyday life.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/safe-route" className="text-gray-300 hover:text-white">Safe Route</Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-300 hover:text-white">Emergency</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white">Resources</Link>
              </li>
              <li>
                <Link to="/helpline" className="text-gray-300 hover:text-white">Helpline</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 flex-shrink-0" />
                <span>Emergency: 1800-</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-1 flex-shrink-0" />
                <span>support@shesafe.org</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0" />
                <span>SheSafe Foundation, jabalpur,M.P.</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for safety tips and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit" 
                className="bg-primary-500 hover:bg-primary-600 text-white py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SheSafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;