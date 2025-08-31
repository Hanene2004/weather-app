import React from 'react';

interface UnitToggleProps {
  unit: 'C' | 'F';
  onToggle: (unit: 'C' | 'F') => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-white/30">
      <div className="flex relative">
        <div 
          className={`absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-md transition-all duration-300 ease-out ${
            unit === 'C' ? 'left-1.5 right-1/2' : 'left-1/2 right-1.5'
          }`}
        />
        
        <button
          onClick={() => onToggle('C')}
          className={`relative z-10 px-8 py-3 rounded-xl transition-all duration-300 font-bold text-lg ${
            unit === 'C'
              ? 'text-gray-800'
              : 'text-white hover:text-gray-200'
          }`}
        >
          °C
        </button>
        <button
          onClick={() => onToggle('F')}
          className={`relative z-10 px-8 py-3 rounded-xl transition-all duration-300 font-bold text-lg ${
            unit === 'F'
              ? 'text-gray-800'
              : 'text-white hover:text-gray-200'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};