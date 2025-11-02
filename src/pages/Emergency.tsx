import React, { useState } from 'react';
import { AlertTriangle, Mic, Phone, Shield, X, Info, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Emergency: React.FC = () => {
  const [activeTab, setActiveTab] = useState('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceCommands, setVoiceCommands] = useState([
    { command: '"Help me"', description: 'Activates emergency protocol' },
    { command: '"Send location"', description: 'Shares your current location' },
    { command: '"Call police"', description: 'Contacts emergency services' },
    { command: '"Record"', description: 'Starts audio recording for evidence' },
  ]);
  
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Police', number: '100', icon: <Shield size={18} /> },
    { name: 'Women Helpline', number: '1091', icon: <Phone size={18} /> },
    { name: 'Emergency Services', number: '112', icon: <AlertTriangle size={18} /> },
  ]);
  
  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would start voice recognition
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsRecording(false);
          simulateEmergencyTrigger();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };
  
  const simulateEmergencyTrigger = () => {
    alert('Emergency protocol activated! Sending alerts to your emergency contacts and sharing your location with emergency services.');
  };
  
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Emergency Response</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quickly activate emergency protocols through voice commands or gesture controls to alert authorities and contacts.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Emergency Activation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-4 font-medium text-center ${
                    activeTab === 'voice'
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('voice')}
                >
                  Voice Activation
                </button>
                <button
                  className={`flex-1 py-4 font-medium text-center ${
                    activeTab === 'gesture'
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('gesture')}
                >
                  Gesture Control
                </button>
              </div>
              
              {/* Voice Activation Tab */}
              {activeTab === 'voice' && (
                <div className="p-6 md:p-8">
                  <div className="text-center mb-10">
                    <div className="mb-6">
                      <div 
                        className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center ${
                          isRecording 
                            ? 'bg-error-100 animate-pulse' 
                            : 'bg-gray-100'
                        }`}
                      >
                        <button
                          onClick={startRecording}
                          disabled={isRecording}
                          className={`w-24 h-24 rounded-full flex items-center justify-center ${
                            isRecording 
                              ? 'bg-error-500 text-white' 
                              : 'bg-primary-500 text-white hover:bg-primary-600'
                          } transition-colors`}
                        >
                          <Mic size={32} />
                        </button>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-semibold mb-2">
                      {isRecording ? 'Listening...' : 'Press to Activate Voice Commands'}
                    </h2>
                    
                    {isRecording && (
                      <div className="text-center">
                        <p className="text-error-600 font-medium mb-2">
                          Say "Help me" to trigger emergency alert
                        </p>
                        <div className="inline-block px-3 py-1 rounded-full bg-error-100 text-error-600">
                          Recording: {recordingTime}s
                        </div>
                      </div>
                    )}
                    
                    {!isRecording && (
                      <p className="text-gray-600 max-w-md mx-auto">
                        In an emergency, tap the button and speak one of the voice commands to activate the emergency response.
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Available Voice Commands</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voiceCommands.map((cmd, index) => (
                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                          <Volume2 size={18} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{cmd.command}</p>
                            <p className="text-sm text-gray-600">{cmd.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Gesture Control Tab */}
              {activeTab === 'gesture' && (
                <div className="p-6 md:p-8">
                  <div className="text-center mb-10">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFji8Kq1UBNe0OgCfdFsrxOBRem1EDwVI6A&s" 
                      alt="Gesture demonstration" 
                      className="w-64 h-64 object-cover rounded-lg mx-auto mb-6"
                    />
                    
                    <h2 className="text-2xl font-semibold mb-2">
                      Emergency Gesture Controls
                    </h2>
                    
                    <p className="text-gray-600 max-w-md mx-auto">
                      Quickly press the power button 5 times in succession to silently trigger an emergency alert.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Available Gesture Commands</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <div className="mr-4 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-primary-700">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Power Button × 5</h4>
                            <p className="text-sm text-gray-600">
                              Rapidly press the power button 5 times to trigger silent emergency alert
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <div className="mr-4 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-primary-700">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Volume Up + Power (Hold 3s)</h4>
                            <p className="text-sm text-gray-600">
                              Hold volume up and power buttons together for 3 seconds to trigger alert with audio recording
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-md">
                        <div className="flex items-start">
                          <div className="mr-4 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-primary-700">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Shake Device Rapidly</h4>
                            <p className="text-sm text-gray-600">
                              Shake your device rapidly for 5 seconds to trigger emergency protocol
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Right Column - Emergency Contacts & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* Emergency Contacts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
                
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          {contact.icon}
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.number}</p>
                        </div>
                      </div>
                      <a
                        href={`tel:${contact.number}`}
                        className="p-2 text-primary-600 hover:text-primary-700"
                      >
                        <Phone size={20} />
                      </a>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-2 px-4 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Add Contact
                </button>
              </div>
              
              {/* What Happens in Emergency */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">When You Trigger an Emergency</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-700">1</span>
                    </div>
                    <p className="text-gray-700">
                      Your precise location is shared with your emergency contacts
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-700">2</span>
                    </div>
                    <p className="text-gray-700">
                      An SOS alert is sent to the nearest police station
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-700">3</span>
                    </div>
                    <p className="text-gray-700">
                      The app begins recording audio as evidence
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-700">4</span>
                    </div>
                    <p className="text-gray-700">
                      Your phone's flashlight may be activated to draw attention
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Safety Tip */}
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <div className="flex items-start">
                  <Info size={20} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-primary-800">Safety Tip</h3>
                    <p className="text-sm text-primary-700 mt-1">
                      Practice using the emergency features in a safe environment so you're prepared if you ever need to use them in a real emergency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;