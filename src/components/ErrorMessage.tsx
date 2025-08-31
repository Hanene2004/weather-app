import React from 'react';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const isNetworkError = message.toLowerCase().includes('network') || message.toLowerCase().includes('fetch');

  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center max-w-lg bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
        <div className="mb-6">
          {isNetworkError ? (
            <WifiOff className="w-20 h-20 text-red-500 mx-auto animate-pulse" />
          ) : (
            <AlertTriangle className="w-20 h-20 text-amber-500 mx-auto animate-bounce" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {isNetworkError ? 'Connection Issue' : 'Something went wrong'}
        </h3>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">{message}</p>
        
        <div className="space-y-4">
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            <RefreshCw className="w-6 h-6" />
            <span>Try Again</span>
          </button>
          
          {isNetworkError && (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Wifi className="w-4 h-4" />
              <span>Check your internet connection</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};