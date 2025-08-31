import React from 'react';
import { WeatherData } from '../types/weather';
import { Cloud, Droplets, Wind, Eye, Thermometer, Sun, CloudRain, Snowflake, MapPin } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  const temp = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;
  const feelsLike = unit === 'C' ? weather.current.feelslike_c : weather.current.feelslike_f;
  const windSpeed = unit === 'C' ? weather.current.wind_kph : weather.current.wind_mph;
  const windUnit = unit === 'C' ? 'km/h' : 'mph';

  const getGradientClass = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'from-amber-400 via-orange-500 to-red-600';
    } else if (conditionLower.includes('cloud')) {
      return 'from-slate-500 via-slate-600 to-slate-700';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'from-blue-600 via-indigo-700 to-purple-800';
    } else if (conditionLower.includes('snow')) {
      return 'from-blue-300 via-cyan-400 to-blue-600';
    }
    return 'from-blue-600 via-indigo-700 to-purple-800';
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="w-16 h-16 text-yellow-200" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="w-16 h-16 text-blue-200" />;
    } else if (conditionLower.includes('snow')) {
      return <Snowflake className="w-16 h-16 text-blue-100" />;
    }
    return <Cloud className="w-16 h-16 text-gray-200" />;
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-300' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-300' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-300' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-300' };
    return { level: 'Extreme', color: 'text-purple-300' };
  };

  const uvInfo = getUVLevel(weather.current.uv);

  return (
    <div className={`relative bg-gradient-to-br ${getGradientClass(weather.current.condition.text)} p-6 rounded-2xl shadow-xl text-white overflow-hidden`}>
      {/* Location Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-white/80" />
            <h2 className="text-2xl font-bold">{weather.location.name}</h2>
          </div>
          <p className="text-white/80 text-sm">{weather.location.country}</p>
        </div>
        <div className="text-center">
          {getWeatherIcon(weather.current.condition.text)}
        </div>
      </div>
        
      {/* Main Temperature Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold tracking-tight mb-2">
          {Math.round(temp)}°
          <span className="text-2xl opacity-75">{unit}</span>
        </div>
        <p className="text-xl opacity-90 font-medium mb-1">{weather.current.condition.text}</p>
        <p className="text-sm opacity-75">Feels like {Math.round(feelsLike)}°{unit}</p>
      </div>

      {/* Weather Details Grid - Better organized */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
          <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <p className="text-xs opacity-90 mb-1">Humidity</p>
          <p className="text-xl font-bold">{weather.current.humidity}%</p>
          <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
            <div 
              className="bg-blue-300 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${weather.current.humidity}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
          <Wind className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <p className="text-xs opacity-90 mb-1">Wind</p>
          <p className="text-xl font-bold">{Math.round(windSpeed)}</p>
          <p className="text-xs opacity-75">{windUnit}</p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
          <Eye className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <p className="text-xs opacity-90 mb-1">UV Index</p>
          <p className="text-xl font-bold">{weather.current.uv}</p>
          <p className={`text-xs ${uvInfo.color} font-medium`}>{uvInfo.level}</p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
          <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <p className="text-xs opacity-90 mb-1">Feels Like</p>
          <p className="text-xl font-bold">{Math.round(feelsLike)}°</p>
          <p className="text-xs opacity-75">{unit}</p>
        </div>
      </div>

      {/* Weather Summary */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
        <h4 className="text-sm font-semibold mb-3 flex items-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
          Today's Summary
        </h4>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
            <span>Good conditions for outdoor activities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-300 rounded-full"></div>
            <span>Air quality is excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};