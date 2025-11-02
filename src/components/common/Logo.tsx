import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Shield className="text-primary-500" size={28} />
      <span className="text-2xl font-bold text-primary-500">
        She<span className="text-primary-700">Safe</span>
      </span>
    </Link>
  );
};

export default Logo;