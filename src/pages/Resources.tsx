import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, Shield, Activity, Search, ChevronRight, ChevronDown } from 'lucide-react';
import { link } from 'framer-motion/client';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('legal');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  
  const toggleFaq = (index: number) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter(i => i !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };
  
  const categories = [
    { id: 'legal', name: 'Legal Rights', icon: <FileText /> },
    { id: 'self-defense', name: 'Self Defense', icon: <Shield /> },
    { id: 'health', name: 'Health & Wellbeing', icon: <Activity /> },
  ];
  
  const legalResources = [
    {
      title: "Women's Rights Under Constitution",
      description: "Learn about the fundamental rights guaranteed to women under constitutional law.",
      image: "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=300",
      link  : "https://nhrc.nic.in/sites/default/files/Women%E2%80%99s%20Rights%20in%20India%20complete_compressed.pdf"
      
    },
    {
      title: "Sexual Harassment Laws",
      description: "Detailed information on workplace harassment laws and reporting procedures.",
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=300",
      link: "https://www.eeoc.gov/sexual-harassment"
    },
    {
      title: "Domestic Violence Protection",
      description: "Legal protections and resources available for domestic violence victims.",
      image: "https://images.pexels.com/photos/6077369/pexels-photo-6077369.jpeg?auto=compress&cs=tinysrgb&w=300",
      link:"https://wcd.delhi.gov.in/scert/protection-women-domestic-violence-act-2005"
    },
  ];
  
  const selfDefenseResources = [
    {
      title: "Basic Self-Defense Techniques",
      description: "Learn fundamental techniques to protect yourself in threatening situations.",
      image: "https://images.pexels.com/photos/6765029/pexels-photo-6765029.jpeg?auto=compress&cs=tinysrgb&w=300",
      link: "https://online.hilbert.edu/blog/self-defense-techniques-for-women/"
    },
    {
      title: "Safety Tools & Equipment",
      description: "Information about legal safety tools and how to use them effectively.",
      image: "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=300",
      link : "https://m.economictimes.com/news/web-stories/top-9-self-defence-tools-every-woman-should-carry/slideshow/112652005.cms"
    },
    {
      title: "Nearby Self-Defense Classes",
      description: "Find certified self-defense training programs in your area.",
      image: "https://images.pexels.com/photos/8032825/pexels-photo-8032825.jpeg?auto=compress&cs=tinysrgb&w=300",
      link: "https://www.justdial.com/Jabalpur/Self-Defence-Classes/nct-10549881"
    },
  ];
  
  const healthResources = [
    {
      title: "Mental Health Support",
      description: "Resources for trauma counseling and mental health services.",
      image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=300",
      link:"https://www.who.int/health-topics/mental-health"
    },
    {
      title: "Women's Health Services",
      description: "Information about women's health clinics and services.",
      image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=300",
      link: "https://medlineplus.gov/ency/article/007458.htm"
    },
    {
      title: "Stress Management",
      description: "Techniques for managing stress and anxiety in challenging situations.",
      image: "https://images.pexels.com/photos/7188847/pexels-photo-7188847.jpeg?auto=compress&cs=tinysrgb&w=300",
      link: "https://www.helpguide.org/mental-health/stress/stress-management"
    },
  ];
  
  const faqs = [
    {
      question: "What should I do if I feel unsafe walking home?",
      answer: "Stay in well-lit areas, be aware of your surroundings, keep your phone charged, share your location with a trusted contact, and consider using the SheSafe route planner to find safer paths."
    },
    {
      question: "How do I report sexual harassment at work?",
      answer: "Document the incidents with dates and details, report to HR or your supervisor, file a complaint with your company's internal process, and if necessary, contact the Equal Employment Opportunity Commission or local authorities."
    },
    {
      question: "What legal protections exist for domestic violence victims?",
      answer: "Protection orders, emergency restraining orders, housing protections, custody considerations, and access to victim services are available in most jurisdictions. Contact local authorities or domestic violence helplines for immediate assistance."
    },
    {
      question: "How can I find self-defense classes near me?",
      answer: "The SheSafe app can help locate certified self-defense programs in your area. You can also check local community centers, martial arts schools, and women's organizations for classes specifically designed for women."
    },
    {
      question: "What should I do in an emergency situation?",
      answer: "Stay calm, assess the situation, use the SheSafe emergency feature to alert contacts and authorities, move to a safe location if possible, and clearly communicate your situation and location when help arrives."
    },
  ];
  
  const getActiveResources = () => {
    switch (activeCategory) {
      case 'legal':
        return legalResources;
      case 'self-defense':
        return selfDefenseResources;
      case 'health':
        return healthResources;
      default:
        return legalResources;
    }
  };
  
  const filteredResources = getActiveResources().filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Information & Resources</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access legal information, self-defense tutorials, and educational resources to empower yourself with knowledge.
            </p>
          </div>
        </motion.div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search for resources, topics, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href ={resource.link}
                className="flex items-center text-primary-600 font-medium hover:text-primary-700">
                  Learn More <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* FAQs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  {expandedFaqs.includes(index) ? (
                    <ChevronDown size={20} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500" />
                  )}
                </button>
                
                {expandedFaqs.includes(index) && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;