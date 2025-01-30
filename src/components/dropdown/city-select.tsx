// city-select.tsx
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface City {
  id: number;
  name: string;
  region: string;
}

const zimbabweanCities: City[] = [
  { id: 1, name: 'Harare', region: 'Harare Metropolitan' },
  { id: 2, name: 'Bulawayo', region: 'Bulawayo Metropolitan' },
  { id: 3, name: 'Chitungwiza', region: 'Harare Metropolitan' },
  { id: 4, name: 'Mutare', region: 'Manicaland' },
  { id: 5, name: 'Gweru', region: 'Midlands' },
  { id: 5, name: 'Masvingo', region: 'Masvingo' },
];

interface CitySelectProps {
  value: City | null;
  onChange: (city: City) => void;
  label?: string;
}

const CitySelect = ({ value, onChange, label }: CitySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = zimbabweanCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        className="relative w-full"
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <div
          className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 
                         transition-all duration-200 placeholder:text-gray-400 cursor-pointer flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-gray-700">
            {value ? value.name : 'Select a city'}
          </span>
          <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            <input
              type="text"
              className="w-full px-3 py-2 border-b border-gray-200 text-sm focus:outline-none"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="max-h-60 overflow-auto">
              {filteredCities.map(city => (
                <div
                  key={city.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    onChange(city);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                >
                  <div className="font-medium">{city.name}</div>
                  <div className="text-xs text-gray-500">{city.region}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelect;