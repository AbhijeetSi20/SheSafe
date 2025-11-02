import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bell, Clock, Calendar, Users, Shield, Settings, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const recentAlerts = [
    {
      id: 1,
      type: 'Route Warning',
      message: 'Lower safety score detected on your evening commute route.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'System Update',
      message: 'New safety features available in your area.',
      time: 'Yesterday',
      read: true,
    },
    {
      id: 3,
      type: 'Emergency Test',
      message: 'Your emergency protocol test was completed successfully.',
      time: '3 days ago',
      read: true,
    },
  ];
  
  const savedLocations = [
    { name: 'Home', address: '123 Residential Street, Cityville', safety: 9 },
    { name: 'Office', address: '456 Business Avenue, Downtown', safety: 7 },
    { name: 'Gym', address: '789 Fitness Lane, Westside', safety: 8 },
  ];
  
  const upcomingAppointments = [
    {
      type: 'Counseling Session',
      with: 'Dr. Sarah Johnson',
      date: 'June 15, 2025',
      time: '10:00 AM',
    },
    {
      type: 'Self-Defense Class',
      with: 'Trainer Michael Chen',
      date: 'June 18, 2025',
      time: '6:30 PM',
    },
  ];
  
  const safetyStats = [
    { label: 'Average Route Safety', value: '7.8/10' },
    { label: 'Emergency Tests', value: '2 Completed' },
    { label: 'Alerts Received', value: '12' },
    { label: 'Resources Viewed', value: '24' },
  ];
  
  const emergencyContacts = [
    { name: 'Mom', phone: '+1 (555) 123-4567', relationship: 'Family' },
    { name: 'Jane Smith', phone: '+1 (555) 987-6543', relationship: 'Friend' },
    { name: 'Robert Johnson', phone: '+1 (555) 765-4321', relationship: 'Colleague' },
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, Sarah</h1>
                <p className="opacity-90">Your personalized safety dashboard</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white/20 rounded-lg py-2 px-4 flex items-center">
                  <Bell size={18} className="mr-2" />
                  <span>3 new alerts</span>
                </div>
                <button className="ml-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {['overview', 'alerts', 'locations', 'appointments', 'contacts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm md:text-base font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Safety Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {safetyStats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Alerts</h2>
                <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border ${
                      alert.read ? 'border-gray-200' : 'border-primary-200 bg-primary-50'
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 mr-2 ${alert.read ? 'bg-gray-300' : 'bg-primary-500'}`}></div>
                        <div>
                          <h3 className="font-medium">{alert.type}</h3>
                          <p className="text-gray-600 text-sm">{alert.message}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Saved Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Saved Locations</h2>
                <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  Add Location
                </button>
              </div>
              
              <div className="space-y-4">
                {savedLocations.map((location, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="p-2 bg-gray-100 rounded-md mr-4">
                        <MapPin size={20} className="text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3 text-center">
                        <span className={`text-sm font-semibold ${
                          location.safety >= 8 ? 'text-success-600' : 
                          location.safety >= 6 ? 'text-warning-600' : 'text-error-600'
                        }`}>
                          {location.safety}/10
                        </span>
                        <p className="text-xs text-gray-500">Safety</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right column */}
          <div className="space-y-8">
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-primary-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">S</span>
                </div>
                <h3 className="text-xl font-semibold">Sarah Williams</h3>
                <p className="text-gray-600">Premium Member</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              
              {upcomingAppointments.map((appointment, index) => (
                <div 
                  key={index} 
                  className="mb-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{appointment.type}</h3>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">Upcoming</span>
                  </div>
                  <p className="text-sm text-gray-600">With: {appointment.with}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{appointment.date}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-2 py-2 text-primary-600 font-medium hover:text-primary-700">
                View All Appointments
              </button>
            </motion.div>
            
            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Emergency Contacts</h2>
                <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  Add Contact
                </button>
              </div>
              
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-start p-3 border border-gray-200 rounded-md">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <Users size={18} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded mt-1 inline-block">
                        {contact.relationship}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border border-primary-200 rounded-md text-primary-700 hover:bg-primary-50 transition-colors text-center">
                  <MapPin size={20} className="mx-auto mb-1" />
                  <span className="text-sm">Safe Route</span>
                </button>
                
                <button className="p-3 border border-error-200 rounded-md text-error-700 hover:bg-error-50 transition-colors text-center">
                  <Shield size={20} className="mx-auto mb-1" />
                  <span className="text-sm">Test Emergency</span>
                </button>
                
                <button className="p-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-center">
                  <Calendar size={20} className="mx-auto mb-1" />
                  <span className="text-sm">Book Session</span>
                </button>
                
                <button className="p-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-center">
                  <Users size={20} className="mx-auto mb-1" />
                  <span className="text-sm">Contacts</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;