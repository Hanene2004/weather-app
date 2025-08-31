import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';
import { weatherService } from '../services/weatherService';

export const useWeather = (initialLocation = 'London') => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherService.getCurrentWeather(location);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(initialLocation);
  }, [initialLocation]);

  return {
    weather,
    loading,
    error,
    refetch: fetchWeather
  };
};