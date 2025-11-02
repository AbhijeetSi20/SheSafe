import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Info, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import MapComponent from '../components/map/MapComponent';

const SafeRoute: React.FC = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    locationType: 'urban',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [safetyScore, setSafetyScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const [routeTrigger, setRouteTrigger] = useState<number>(0);
  const [followUser, setFollowUser] = useState<boolean>(true);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Trigger map to geocode & draw route when user submits
    setRouteTrigger(Date.now());
    
    // Simulate API call to get safety score
    setTimeout(() => {
      const score = Math.floor(Math.random() * 5) + 5; // Random score between 5-10 for demo
      setSafetyScore(score);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const getSafetyColor = (score: number) => {
    if (score >= 8) return 'text-success-500';
    if (score >= 6) return 'text-warning-500';
    return 'text-error-500';
  };
  
  const getSafetyText = (score: number) => {
    if (score >= 8) return 'Very Safe';
    if (score >= 6) return 'Moderately Safe';
    return 'Use Caution';
  };
  
  const getSafetyRecommendations = (score: number) => {
    const recommendations = [
      'Share your live location with a trusted contact',
      'Plan to travel in well-lit, populated areas',
      'Keep your phone charged and easily accessible',
    ];
    
    if (score < 8) {
      recommendations.push(
        'Consider taking an alternative route if available',
        'Avoid traveling alone if possible'
      );
    }
    
    if (score < 6) {
      recommendations.push(
        'Consider rescheduling your journey for daylight hours',
        'Use a ride-sharing service instead of walking',
        'Keep emergency contacts on speed dial'
      );
    }
    
    return recommendations;
  };

  // Build a shareable Google Maps directions URL with extra query params (date/time/safety)
  function buildShareUrl() {
    const { origin, destination, date, time } = formData;
    if (!origin || !destination) return null;
    const base = 'https://www.google.com/maps/dir/?api=1';
    const params = new URLSearchParams();
    params.set('origin', origin);
    params.set('destination', destination);
    params.set('travelmode', 'driving');
    // Add context params (not used by Google Maps but useful for your own tracking or display)
    if (date) params.set('date', date);
    if (time) params.set('time', time);
    if (safetyScore !== null) params.set('safety', String(safetyScore));
    return `${base}&${params.toString()}`;
  }

  // Share route: try Web Share API, fallback to copy-to-clipboard
  async function shareRoute() {
    if (!formData.origin || !formData.destination) {
      alert('Please enter both starting point and destination to share the route.');
      return;
    }

    const url = buildShareUrl();
    if (!url) {
      alert('Unable to build share link.');
      return;
    }

    const shareTitle = 'SafeRoute: Journey details';
    const shareText = `Route: ${formData.origin} → ${formData.destination}` + 
      (safetyScore !== null ? `\nSafety Score: ${safetyScore}/10` : '') +
      (formData.date ? `\nDate: ${formData.date}` : '') +
      (formData.time ? `\nTime: ${formData.time}` : '');

    // Prefer native share (mobile / supported desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url,
        });
        // Optionally provide UI feedback — small alert for demo
        alert('Route shared successfully.');
        return;
      } catch (err) {
        // User may have cancelled share; continue to fallback
        console.warn('Web Share failed or was cancelled:', err);
      }
    }

    // Fallback: try clipboard
    const clipboardText = `${shareTitle}\n${shareText}\n\nOpen directions: ${url}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(clipboardText);
        alert('Share link copied to clipboard. Paste it to share the route.');
        return;
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    }

    // Final fallback: open the url in a new tab and also show it to user
    try {
      window.open(url, '_blank');
      alert('Could not copy to clipboard or open share sheet. The route has been opened in a new tab.');
    } catch (e) {
      alert('Unable to share route. Please copy the following link manually:\n' + url);
    }
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Safe Route Planner</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Plan your journey with safety in mind. Get real-time safety scores based on location, time, and environmental factors.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6">Enter Route Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                    Starting Point
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter starting location"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter destination"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Travel
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time of Travel
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="locationType" className="block text-sm font-medium text-gray-700 mb-1">
                    Location Type
                  </label>
                  <select
                    id="locationType"
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleChange}
                    className="block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="urban">Urban Area</option>
                    <option value="suburban">Suburban Area</option>
                    <option value="rural">Rural Area</option>
                    <option value="highway">Highway</option>
                  </select>
                </div>

                {/* toggle follow user (optional) */}
                <div className="flex items-center gap-3">
                  <input
                    id="followUser"
                    type="checkbox"
                    checked={followUser}
                    onChange={() => setFollowUser((f) => !f)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="followUser" className="text-sm text-gray-700">Follow my live location on map</label>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Analyzing Route Safety...' : 'Analyze Route Safety'}
                </button>
              </form>
              
              {/* Safety Factors Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-start">
                  <Info size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Analysis Factors</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Our AI analyzes the following factors to determine route safety:
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Historical crime data</li>
                      <li>• Population density</li>
                      <li>• Proximity to police stations</li>
                      <li>• Lighting conditions based on time</li>
                      <li>• Presence of commercial establishments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Map & Results Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Map Display */}
              <div className="h-[300px] bg-gray-100">
                <MapComponent
                  origin={formData.origin}
                  destination={formData.destination}
                  routeTrigger={routeTrigger}
                  followUser={followUser}
                />
              </div>
              
              {/* Results Section */}
              {showResults && safetyScore !== null && (
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-4">Safety Analysis</h2>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      <span className={`text-3xl font-bold ${getSafetyColor(safetyScore)}`}>
                        {safetyScore}/10
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${getSafetyColor(safetyScore)}`}>
                        {getSafetyText(safetyScore)}
                      </h3>
                      <p className="text-gray-600">
                        {formData.origin} to {formData.destination}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Safety Recommendations</h3>
                    <ul className="space-y-2">
                      {getSafetyRecommendations(safetyScore).map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          {safetyScore < 6 ? (
                            <AlertTriangle size={18} className="text-error-500 mr-2 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Info size={18} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={shareRoute}
                      className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                      Share Route
                    </button>
                    <button className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                      Save Route
                    </button>
                  </div>
                </div>
              )}
              
              {!showResults && (
                <div className="p-6 md:p-8 text-center">
                  <p className="text-gray-600">
                    Enter your route details to get a safety analysis and recommendations.
                  </p>
                </div>
              )}
            </div>
            
            {/* Alternative Routes Section (only shown if results are displayed) */}
            {showResults && safetyScore !== null && safetyScore < 8 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Alternative Safer Routes</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Alternative Route 1</h3>
                        <p className="text-sm text-gray-600">Via Main Avenue - 5 min longer</p>
                      </div>
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100`}>
                        <span className="text-lg font-bold text-success-500">8/10</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Alternative Route 2</h3>
                        <p className="text-sm text-gray-600">Via Highway 101 - 10 min longer</p>
                      </div>
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100`}>
                        <span className="text-lg font-bold text-success-500">9/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SafeRoute;
