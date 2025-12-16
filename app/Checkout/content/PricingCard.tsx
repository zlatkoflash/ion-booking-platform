import React from 'react';
import { Euro, Users, Clock, Star } from 'lucide-react';

interface PricingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  option: PricingOption;
  onSelect: (option: PricingOption) => void;
  selected?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ option, onSelect, selected }) => {
  return (
    <div 
      onClick={() => onSelect(option)}
      className={`
        relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105
        ${selected 
          ? 'border-blue-600 bg-blue-50 shadow-lg' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
        ${option.popular ? 'ring-2 ring-blue-600 ring-opacity-50' : ''}
      `}
    >
      {option.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{option.name}</h3>
        <div className="flex items-center justify-center mb-2">
          <Euro className="w-6 h-6 text-green-600 mr-1" />
          <span className="text-3xl font-bold text-gray-800">{option.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm">{option.description}</p>
      </div>

      <div className="space-y-2 mb-6">
        {option.features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center">
          <Users className="w-3 h-3 mr-1" />
          <span>Small groups</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>2-3 hours</span>
        </div>
        <div className="flex items-center">
          <Star className="w-3 h-3 mr-1" />
          <span>Expert guide</span>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;