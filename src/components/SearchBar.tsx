import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, Clock, Star } from 'lucide-react';
import { weatherService } from '../services/weatherService';
import { SearchResult } from '../types/weather';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
  onUseCurrentLocation: () => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onLocationSelect, 
  onUseCurrentLocation,
  loading = false 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['New York', 'London', 'Tokyo']);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentWeatherSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchLocations = async () => {
      if (query.length < 2) {
        setResults([]);
        setShowResults(query.length === 0);
        return;
      }

      setSearchLoading(true);
      try {
        const searchResults = await weatherService.searchLocations(query);
        setResults(searchResults);
        setShowResults(true);
      } catch (error) {
        setResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchLocations, 200);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelectLocation = (location: SearchResult | string) => {
    const locationString = typeof location === 'string' 
      ? location 
      : `${location.name}, ${location.country}`;
    
    setQuery(locationString);
    setShowResults(false);
    onLocationSelect(locationString);

    // Add to recent searches
    const updated = [locationString, ...recentSearches.filter(s => s !== locationString)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentWeatherSearches', JSON.stringify(updated));
  };

  const handleInputFocus = () => {
    if (query.length === 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {searchLoading ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="Search for any city worldwide..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all duration-300 text-base bg-white/90 backdrop-blur-md shadow-lg placeholder-gray-500 hover:bg-white/95"
          />
          
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/30 overflow-hidden z-20 max-h-80 overflow-y-auto">
              {query.length === 0 ? (
                <div className="p-4">
                  {/* Favorites */}
                  {favorites.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-3 px-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-gray-600">Popular Cities</span>
                      </div>
                      {favorites.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleSelectLocation(city)}
                          className="w-full px-3 py-2.5 text-left hover:bg-indigo-50 transition-colors duration-200 rounded-lg mb-1 group"
                        >
                          <div className="flex items-center space-x-3">
                            <Star className="w-4 h-4 text-yellow-400 group-hover:text-yellow-500" />
                            <span className="font-medium text-gray-800">{city}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3 px-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-600">Recent Searches</span>
                      </div>
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => handleSelectLocation(search)}
                          className="w-full px-3 py-2.5 text-left hover:bg-gray-50 transition-colors duration-200 rounded-lg mb-1 group"
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                            <span className="font-medium text-gray-800">{search}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectLocation(result)}
                    className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 group"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600" />
                      <div>
                        <div className="font-semibold text-gray-800">{result.name}</div>
                        <div className="text-sm text-gray-600">{result.region}, {result.country}</div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        
        <button
          onClick={onUseCurrentLocation}
          disabled={loading}
          className="px-6 py-4 bg-white/90 hover:bg-white disabled:bg-white/70 text-indigo-600 rounded-xl shadow-lg transition-all duration-300 flex items-center space-x-2 backdrop-blur-md border border-white/30 hover:scale-105 disabled:hover:scale-100"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          <span className="hidden sm:inline font-semibold text-sm">Current</span>
        </button>
      </div>
    </div>
  );
};