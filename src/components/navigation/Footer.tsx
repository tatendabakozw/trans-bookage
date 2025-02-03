import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Africa Connect
            </Link>
            <p className="text-gray-600 text-sm">
              Your trusted partner for comfortable and reliable bus travel across the country.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'FAQs', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-600 hover:text-red-600 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="h-5 w-5 text-red-600 mr-2" />
                Kwame Nkruma | Africa Connect
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <PhoneIcon className="h-5 w-5 text-red-600 mr-2" />
                +263 77 230 3766
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <EnvelopeIcon className="h-5 w-5 text-red-600 mr-2" />
                info@africaconnectzw.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <form className="space-y-3">
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © {currentYear} Africa Connect. All rights reserved.
            </p>

           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;