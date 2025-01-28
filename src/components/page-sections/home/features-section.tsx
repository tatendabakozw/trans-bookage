import { motion } from 'framer-motion';
import { ShieldCheckIcon, ClockIcon, MapIcon, CreditCardIcon } from '@heroicons/react/24/outline';

function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose Us
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Experience hassle-free bus travel with our premium services
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: ShieldCheckIcon,
            title: 'Secure Booking',
            description: 'Your safety is our top priority with secure payment systems'
          },
          {
            icon: ClockIcon,
            title: '24/7 Support',
            description: 'Round the clock customer support for your convenience'
          },
          {
            icon: MapIcon,
            title: 'Wide Coverage',
            description: 'Access to thousands of routes across the country'
          },
          {
            icon: CreditCardIcon,
            title: 'Easy Payments',
            description: 'Multiple payment options for hassle-free transactions'
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FeaturesSection