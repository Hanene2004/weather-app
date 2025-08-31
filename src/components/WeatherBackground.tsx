import React from 'react';

interface WeatherBackgroundProps {
  condition: string;
  children: React.ReactNode;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition, children }) => {
  const getBackgroundElements = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return (
        <>
          {/* Sun rays */}
          <div className="absolute top-20 right-20 w-64 h-64 opacity-10">
            <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute inset-4 bg-yellow-200 rounded-full animate-pulse"></div>
          </div>
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </>
      );
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return (
        <>
          {/* Rain drops */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-200 opacity-20 animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            ></div>
          ))}
        </>
      );
    } else if (conditionLower.includes('snow')) {
      return (
        <>
          {/* Snowflakes */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-40 animate-snow"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </>
      );
    }
    
    return (
      <>
        {/* Default cloudy animation */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </>
    );
  };

  return (
    <div className="relative overflow-hidden">
      {getBackgroundElements()}
      {children}
    </div>
  );
};