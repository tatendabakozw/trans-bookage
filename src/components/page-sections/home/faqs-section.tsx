import { motion } from 'framer-motion';

export function FAQSection() {
    const faqs = [
      {
        question: "How do I book a bus ticket?",
        answer: "Simply search for your route, select your preferred bus, and complete the booking process online."
      },
      // Add more FAQs...
    ];
  
    return (
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600">Find answers to common questions about our service</p>
          </motion.div>
  
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }