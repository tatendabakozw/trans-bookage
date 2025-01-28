import React from 'react'
import { motion } from 'framer-motion';
import { MapIcon } from '@heroicons/react/24/outline';

function PopularRoutesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Routes
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most traveled bus routes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { from: 'Harare', to: 'Bulawayo', price: 30, time: '5h 30m' },
            { from: 'Mutare', to: 'Masvingo', price: 25, time: '4h' },
            { from: 'Victoria Falls', to: 'Gweru', price: 40, time: '6h' },
            { from: 'Harare', to: 'Mutare', price: 20, time: '3h 30m' },
            { from: 'Bulawayo', to: 'Victoria Falls', price: 35, time: '5h 30m' },
            { from: 'Harare', to: 'Gweru', price: 18, time: '3h' }
          ].map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-semibold">{route.from}</p>
                </div>
                <MapIcon className="w-6 h-6 text-blue-600" />
                <div className="space-y-1 text-right">
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-semibold">{route.to}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-gray-600">{route.time}</div>
                <div className="font-semibold text-lg">From ${route.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularRoutesSection;
