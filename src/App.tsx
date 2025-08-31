import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBar } from './components/SearchBar';
import { UnitToggle } from './components/UnitToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WeatherStats } from './components/WeatherStats';
import { WeatherBackground } from './components/WeatherBackground';
import { CloudSun, Sparkles } from 'lucide-react';

function App() {
  const [location, setLocation] = useState('London');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const { weather, loading, error, refetch } = useWeather(location);
  const { getCurrentLocation, loading: geoLoading } = useGeolocation();

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
    refetch(newLocation);
  };

  const handleUseCurrentLocation = () => {
    getCurrentLocation();
    // In a real app, you'd use the coordinates to get weather
    // For demo purposes, we'll just fetch London weather
    handleLocationSelect('London');
  };

  const getBackgroundClass = (condition?: string) => {
    if (!condition) return 'from-slate-900 via-slate-800 to-slate-900';
    
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'from-amber-500 via-orange-600 to-red-700';
    } else if (conditionLower.includes('cloud')) {
      return 'from-slate-600 via-slate-700 to-slate-800';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'from-blue-700 via-indigo-800 to-purple-900';
    } else if (conditionLower.includes('snow')) {
      return 'from-blue-400 via-cyan-500 to-blue-700';
    }
    return 'from-slate-900 via-slate-800 to-slate-900';
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass(weather?.current.condition.text)} transition-all duration-1000 relative`}>
      <WeatherBackground condition={weather?.current.condition.text || 'clear'}>
        <div className="container mx-auto px-4 py-6 relative z-10">
          {/* Header - Simplified and more organized */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <CloudSun className="w-10 h-10 text-white drop-shadow-lg" />
                <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                  WeatherNow
                </h1>
                <p className="text-white/80 text-sm font-medium">Real-time weather updates</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-white/90">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Live</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <span className="text-xs font-medium">{getCurrentTime()}</span>
            </div>
          </div>

          {/* Search and Controls - Better positioned */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar 
              onLocationSelect={handleLocationSelect}
              onUseCurrentLocation={handleUseCurrentLocation}
              loading={geoLoading}
            />
          </div>

          {/* Main Content - Reorganized layout */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage 
                message={error} 
                onRetry={() => refetch(location)} 
              />
            ) : weather ? (
              <>
                {/* Unit Toggle - Centered and compact */}
                <div className="flex justify-center mb-6">
                  <UnitToggle unit={unit} onToggle={setUnit} />
                </div>
                
                {/* Main Weather Display - Better grid organization */}
                <div className="grid lg:grid-cols-12 gap-6 mb-8">
                  {/* Primary Weather Card - Takes more space */}
                  <div className="lg:col-span-8">
                    <WeatherCard weather={weather} unit={unit} />
                  </div>
                  {/* Weather Stats - Sidebar */}
                  <div className="lg:col-span-4">
                    <WeatherStats weather={weather} unit={unit} />
                  </div>
                </div>
                
                {/* Forecast - Full width below */}
                <div className="w-full">
                  <ForecastCard weather={weather} unit={unit} />
                </div>
              </>
            ) : null}
          </div>

          {/* Footer - Simplified */}
          <div className="text-center mt-12 text-white/60">
            <p className="text-xs">
              Powered by advanced weather algorithms • Updated every minute
            </p>
          </div>
        </div>
      </WeatherBackground>
    </div>
  );
}

export default App;