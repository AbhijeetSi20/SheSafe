import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Shield, Book, Phone, AlertTriangle, Headphones } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="text-primary-500" size={32} />,
      title: 'Safe Route Planner',
      description: 'Get safety scores for travel routes based on time, location type, and proximity to important landmarks.',
      link: '/safe-route',
      color: 'bg-primary-50',
      buttonColor: 'text-primary-600 border-primary-200 hover:bg-primary-50',
    },
    {
      icon: <AlertTriangle className="text-error-500" size={32} />,
      title: 'Emergency Response',
      description: 'Voice-activated emergency alarms that send SOS alerts to police and emergency contacts.',
      link: '/emergency',
      color: 'bg-error-50',
      buttonColor: 'text-error-600 border-error-200 hover:bg-error-50',
    },
    {
      icon: <Book className="text-secondary-500" size={32} />,
      title: 'Information & Resources',
      description: 'Access legal information, step-by-step procedures, and self-defense tutorials.',
      link: '/resources',
      color: 'bg-secondary-50',
      buttonColor: 'text-secondary-600 border-secondary-200 hover:bg-secondary-50',
    },
    {
      icon: <Headphones className="text-accent-500" size={32} />,
      title: '24/7 Helpline',
      description: 'Round-the-clock assistance through helpline numbers and professional counseling.',
      link: '/helpline',
      color: 'bg-accent-50',
      buttonColor: 'text-accent-600 border-accent-200 hover:bg-accent-50',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Enhancing Women's Safety with AI Technology
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                SheSafe provides real-time safety predictions, emergency response systems, and educational tools to ensure women's security and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/safe-route">
                  <button className="px-6 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition-colors">
                    Plan Safe Route
                  </button>
                </Link>
                <Link to="/emergency">
                  <button className="px-6 py-3 bg-primary-700 text-white rounded-md font-medium border border-white/30 hover:bg-primary-800 transition-colors">
                    Emergency Help
                  </button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <img 
                src="safe.jpg" 
                alt="Woman using SheSafe app" 
                className="rounded-lg shadow-xl max-w-lg mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">98%</p>
              <p className="text-gray-600">User Safety Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50K+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1000+</p>
              <p className="text-gray-600">Emergency Assists</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">24/7</p>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              SheSafe combines cutting-edge technology with practical safety solutions to provide a comprehensive safety platform for women.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${feature.color} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link to={feature.link}>
                  <button className={`px-4 py-2 rounded border ${feature.buttonColor} font-medium transition-colors`}>
                    Learn More
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SheSafe Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform uses advanced AI and machine learning to provide real-time safety solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Input Your Details</h3>
              <p className="text-gray-600">
                Enter your travel time, location type, and other relevant details to get personalized safety insights.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyses crime rates, population density, proximity to police stations, and other safety factors.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive safety scores, recommended routes, and specific safety tips tailored to your situation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from women who have used SheSafe to enhance their safety and peace of mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Priya S.</h4>
                  <p className="text-sm text-gray-500">New Delhi</p>
                </div>
              </div>
              <p className="text-gray-600">
                "SheSafe has revolutionized how I navigate the city. The route planner helps me avoid unsafe areas, especially when I'm traveling late at night."
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Aisha M.</h4>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The emergency response feature gave me confidence to take that late-night job. Knowing help is just a voice command away is incredibly reassuring."
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sneha K.</h4>
                  <p className="text-sm text-gray-500">Bangalore</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a college student, the educational resources have been invaluable. I've learned so much about my legal rights and self-defense techniques."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join SheSafe Today</h2>
            <p className="text-xl mb-8">
              Take control of your safety with SheSafe's comprehensive safety platform. Register now to access all features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="px-8 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Sign Up for Free
                </button>
              </Link>
              <Link to="/resources">
                <button className="px-8 py-3 bg-transparent text-white rounded-md font-medium border border-white hover:bg-primary-700 transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;