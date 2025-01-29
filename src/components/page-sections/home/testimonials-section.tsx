import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

function TestimonialsSection() {
    const testimonials = [
        {
          name: "Sarah Johnson",
          role: "Regular Traveler",
          image: "/testimonials/sarah.jpg",
          quote: "The most reliable bus booking service I've ever used. Excellent customer service!",
          rating: 5
        },
        // Add more testimonials...
      ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-xl text-gray-600">Trusted by thousands of satisfied travelers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">

                <div className="h-12 w-12 rounded-full bg-zinc-100"></div>
                {/* <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full"
                /> */}
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection