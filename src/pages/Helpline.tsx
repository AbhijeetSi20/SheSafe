import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Clock, Users, MessageSquare, MapPin, Info, ChevronRight } from 'lucide-react';

const Helpline: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    reason: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsBooked(true);
    }, 1500);
  };
  
  const emergencyHelplines = [
    { name: 'Women\'s Helpline', number: '1091', available: '24/7' },
    { name: 'Domestic Violence Helpline', number: '181', available: '24/7' },
    { name: 'Police Emergency', number: '100', available: '24/7' },
    { name: 'National Commission for Women', number: '011-26942369', available: '10:00 AM - 5:00 PM' },
  ];
  
  const counselingServices = [
    { 
      name: 'Mental Health Support', 
      description: 'Professional counseling for trauma, anxiety, and stress management',
      image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    { 
      name: 'Career Guidance', 
      description: 'Support for workplace issues, career development, and professional growth',
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    { 
      name: 'Family Counseling', 
      description: 'Relationship counseling and family dispute resolution services',
      image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">24/7 Helpline & Counseling</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access round-the-clock assistance through helpline numbers and professional counseling services for emotional well-being.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Emergency Helplines */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <Phone size={24} className="text-primary-500 mr-3" />
                Emergency Helplines
              </h2>
              
              <div className="space-y-5">
                {emergencyHelplines.map((helpline, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-lg">{helpline.name}</h3>
                        <p className="text-sm text-gray-500">Available: {helpline.available}</p>
                      </div>
                      <a 
                        href={`tel:${helpline.number}`} 
                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                      >
                        <Phone size={16} className="mr-2" />
                        {helpline.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-primary-50 rounded-md border border-primary-100">
                <div className="flex items-start">
                  <Info size={20} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-900">Important Note</h3>
                    <p className="text-sm text-primary-800 mt-1">
                      All emergency helplines are confidential. Your identity and details will be protected when you call for assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Counseling Services */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <MessageSquare size={24} className="text-primary-500 mr-3" />
                Counseling Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {counselingServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-gray-600">
                Our counseling services are provided by certified professionals with expertise in women's issues.
              </p>
            </div>
          </motion.div>
          
          {/* Right Column - Book Counseling */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Calendar size={24} className="text-primary-500 mr-3" />
                  Book a Counseling Session
                </h2>
                
                {!isBooked ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Consultation
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows={4}
                        value={formData.reason}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="privacy"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                        I agree to the privacy policy and understand that my information will be kept confidential.
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? 'Booking Session...' : 'Book Counseling Session'}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Session Booked Successfully!</h3>
                    <p className="text-gray-600 mb-6">
                      We've sent a confirmation email to {formData.email} with all the session details.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md inline-block">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">Date:</span>
                        <span className="text-primary-600">{formData.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Time:</span>
                        <span className="text-primary-600">{formData.time}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsBooked(false)}
                      className="mt-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                      Book Another Session
                    </button>
                  </div>
                )}
              </div>
              
              {/* Support Centers Near You */}
              <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin size={20} className="text-primary-500 mr-2" />
                  Support Centers Near You
                </h3>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md p-3 bg-white">
                    <h4 className="font-medium">Women's Wellness Center</h4>
                    <p className="text-sm text-gray-600">123 Main Street, Central District</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Open Now</span>
                      <a href="#" className="text-primary-600 text-sm font-medium">Get Directions</a>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-3 bg-white">
                    <h4 className="font-medium">Community Support Hub</h4>
                    <p className="text-sm text-gray-600">456 Park Avenue, North District</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Closes at 5 PM</span>
                      <a href="#" className="text-primary-600 text-sm font-medium">Get Directions</a>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 w-full py-2 text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center">
                  View All Support Centers <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Helpline;