import { motion } from 'framer-motion';

export function CTASection() {
    return (
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Start Your Journey?</h2>
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Book Your Trip Now
            </button>
          </motion.div>
        </div>
      </section>
    );
  }