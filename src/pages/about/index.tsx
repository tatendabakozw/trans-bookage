import GeneralLayout from '@/layouts/GeneralLayout';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, UserGroupIcon, TruckIcon, HeartIcon } from '@heroicons/react/24/outline';

function AboutUs() {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: "Safety First",
      description: "Your safety is our top priority with regularly serviced coaches and trained drivers."
    },
    {
      icon: UserGroupIcon,
      title: "Customer-Centric",
      description: "We put our passengers first, offering personalized and reliable services."
    },
    {
      icon: TruckIcon,
      title: "Reliability",
      description: "Count on us to get you to your destination on time, every time."
    },
    {
      icon: HeartIcon,
      title: "Community Focused",
      description: "Proud to serve Zimbabwe and contribute to our communities' growth."
    }
  ];

  return (
    <GeneralLayout>
      <div className="min-h-screen bg-gradient-to-br py-16 from-slate-50 to-blue-50/30">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Africa Connect
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your trusted partner in reliable and comfortable coach travel across Zimbabwe. 
            We connect people, communities, and destinations through safe, affordable, 
            and efficient bus services.
          </p>
        </motion.div>

        {/* Values Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <value.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We're redefining road travel in Zimbabwe by offering safe, comfortable, 
              and affordable transportation solutions. Our commitment to punctuality, 
              professionalism, and exceptional customer service ensures every journey 
              with us is memorable.
            </p>
          </div>
        </motion.div>
      </div>
    </GeneralLayout>
  );
}

export default AboutUs;