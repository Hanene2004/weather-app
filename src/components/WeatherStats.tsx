import React from 'react';
import { WeatherData } from '../types/weather';
import { Activity, Gauge, Thermometer, Wind, Info } from 'lucide-react';

interface WeatherStatsProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

export const WeatherStats: React.FC<WeatherStatsProps> = ({ weather, unit }) => {
  const windSpeed = unit === 'C' ? weather.current.wind_kph : weather.current.wind_mph;
  const windUnit = unit === 'C' ? 'km/h' : 'mph';

  const getComfortLevel = () => {
    const temp = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;
    const humidity = weather.current.humidity;
    
    if (unit === 'C') {
      if (temp >= 20 && temp <= 26 && humidity >= 40 && humidity <= 60) {
        return { level: 'Perfect', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      } else if (temp >= 15 && temp <= 30 && humidity >= 30 && humidity <= 70) {
        return { level: 'Comfortable', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      } else {
        return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      }
    } else {
      if (temp >= 68 && temp <= 79 && humidity >= 40 && humidity <= 60) {
        return { level: 'Perfect', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      } else if (temp >= 59 && temp <= 86 && humidity >= 30 && humidity <= 70) {
        return { level: 'Comfortable', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      } else {
        return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      }
    }
  };

  const comfort = getComfortLevel();

  return (
    <div className="space-y-6">
      {/* Detailed Conditions Section */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Activity className="w-5 h-5 text-indigo-600 mr-2" />
          Detailed Conditions
        </h3>
        
        <div className="space-y-4">
          {/* Comfort Level */}
          <div className={`${comfort.bg} ${comfort.border} rounded-xl p-4 border`}>
            <div className="flex items-center justify-between mb-2">
              <Gauge className="w-5 h-5 text-indigo-600" />
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${comfort.color} ${comfort.bg}`}>
                {comfort.level}
              </span>
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-1">Comfort Level</h4>
            <p className="text-xs text-gray-600">Based on temperature and humidity</p>
          </div>

          {/* Wind Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Wind className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-bold text-blue-800">{Math.round(windSpeed)}</span>
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-1">Wind Speed</h4>
            <p className="text-xs text-gray-600">{windUnit} • Light breeze</p>
          </div>

          {/* Temperature Range */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="w-5 h-5 text-orange-600" />
              <div className="text-right">
                <div className="text-lg font-bold text-orange-800">
                  {Math.round(unit === 'C' ? weather.current.temp_c : weather.current.temp_f)}°{unit}
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-1">Temperature</h4>
            <p className="text-xs text-gray-600">
              Feels like {Math.round(unit === 'C' ? weather.current.feelslike_c : weather.current.feelslike_f)}°{unit}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Highlights Section */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Info className="w-5 h-5 text-indigo-600 mr-2" />
          Today's Highlights
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-xl">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Air quality is good</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Low UV exposure risk</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-xl">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Perfect for outdoor activities</span>
          </div>
        </div>
      </div>
    </div>
  );
};