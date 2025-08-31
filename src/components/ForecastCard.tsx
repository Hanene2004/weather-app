import React, { useState } from 'react';
import { WeatherData } from '../types/weather';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface ForecastCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ weather, unit }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  if (!weather.forecast) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const selectedForecast = weather.forecast.forecastday[selectedDay];

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mt-8 border border-white/20">
      <div className="flex items-center space-x-3 mb-8">
        <Calendar className="w-8 h-8 text-indigo-600" />
        <h3 className="text-3xl font-bold text-gray-800">5-Day Forecast</h3>
      </div>
      
      {/* Forecast tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {weather.forecast.forecastday.map((day, index) => {
          const maxTemp = unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f;
          const minTemp = unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f;
          
          return (
            <button
              key={day.date}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 p-4 rounded-2xl transition-all duration-300 min-w-[140px] ${
                selectedDay === index
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-102'
              }`}
            >
              <div className="text-center">
                <p className="font-semibold text-sm mb-2">
                  {index === 0 ? 'Today' : formatDate(day.date)}
                </p>
                <img 
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="w-10 h-10 mx-auto mb-2"
                />
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <span className="font-bold">{Math.round(maxTemp)}°</span>
                  <span className="opacity-70">{Math.round(minTemp)}°</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day details */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">
              {selectedDay === 0 ? 'Today' : formatFullDate(selectedForecast.date)}
            </h4>
            <p className="text-gray-600 text-lg">{selectedForecast.day.condition.text}</p>
          </div>
          <img 
            src={`https:${selectedForecast.day.condition.icon}`}
            alt={selectedForecast.day.condition.text}
            className="w-16 h-16 drop-shadow-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-6 h-6 text-red-500" />
              <span className="font-semibold text-gray-700">High Temperature</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {Math.round(unit === 'C' ? selectedForecast.day.maxtemp_c : selectedForecast.day.maxtemp_f)}°{unit}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingDown className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-gray-700">Low Temperature</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {Math.round(unit === 'C' ? selectedForecast.day.mintemp_c : selectedForecast.day.mintemp_f)}°{unit}
            </div>
          </div>
        </div>

        {/* Temperature range visualization */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-600 mb-3">Temperature Range</p>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full"></div>
            <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-1000"
                 style={{ width: '20%' }}></div>
            <div className="absolute top-0 right-0 h-full bg-white rounded-full transition-all duration-1000"
                 style={{ width: '15%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{Math.round(unit === 'C' ? selectedForecast.day.mintemp_c : selectedForecast.day.mintemp_f)}°{unit}</span>
            <span>{Math.round(unit === 'C' ? selectedForecast.day.maxtemp_c : selectedForecast.day.maxtemp_f)}°{unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};