import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        {/* Animated weather icons */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-4">
            <Sun className="w-16 h-16 text-yellow-300 animate-spin" />
            <Cloud className="w-20 h-20 text-white animate-bounce" />
            <CloudRain className="w-16 h-16 text-blue-300 animate-pulse" />
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-8 w-2 h-2 bg-white rounded-full animate-float opacity-60"></div>
            <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-blue-200 rounded-full animate-float-delayed opacity-80"></div>
            <div className="absolute bottom-8 left-16 w-3 h-3 bg-yellow-200 rounded-full animate-float-slow opacity-50"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white mb-2">Fetching Weather Data</h3>
          <p className="text-white/80 text-lg">Getting the latest conditions for you...</p>
          
          {/* Loading progress bar */}
          <div className="w-64 mx-auto">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};