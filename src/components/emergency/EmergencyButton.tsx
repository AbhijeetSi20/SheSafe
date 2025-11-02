import React, { useState } from 'react';
import { AlertTriangle, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmergencyButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleEmergencyClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      return;
    }
    
    setPressed(true);
    // In a real implementation, this would trigger the emergency protocol
    setTimeout(() => {
      setPressed(false);
      alert('Emergency services have been notified and contacts alerted with your location. Stay safe.');
    }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 w-64"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">Emergency Help</h3>
              <button 
                onClick={() => setIsExpanded(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Press and hold for 3 seconds to activate emergency protocol:
            </p>
            <ul className="text-xs text-gray-600 mb-4 space-y-1">
              <li>• Alert your emergency contacts</li>
              <li>• Send your current location</li>
              <li>• Contact nearest police station</li>
            </ul>
            <a 
              href="tel:911" 
              className="flex items-center justify-center bg-primary-100 text-primary-700 py-2 rounded-md hover:bg-primary-200 transition-colors"
            >
              <Phone size={16} className="mr-2" />
              Call Emergency Services
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className={`flex items-center justify-center rounded-full shadow-lg ${
          pressed 
            ? 'bg-error-600 animate-pulse-slow' 
            : 'bg-error-500 hover:bg-error-600'
        } text-white w-16 h-16 transition-all`}
        whileTap={{ scale: 0.95 }}
        onClick={handleEmergencyClick}
        onTouchStart={handleEmergencyClick}
      >
        <AlertTriangle size={28} />
      </motion.button>
    </div>
  );
};

export default EmergencyButton;