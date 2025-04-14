import React from 'react';
import { useEffect, useState } from 'react';

interface KenyanFlagLoaderProps {
  fullPage?: boolean;
}

const KenyanFlagLoader = ({ fullPage }: KenyanFlagLoaderProps) => {  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Demo effect to show the loader appearing/disappearing
    const timer = setTimeout(() => {
      setIsVisible(prev => !prev);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`flex items-center justify-center ${fullPage ? 'fixed inset-0 bg-black bg-opacity-50 z-50' : ''}`}>
      <div className="relative w-24 h-24">
        {/* Black circle base */}
        <div className="absolute inset-0 rounded-full bg-kas-black animate-pulse"></div>
        
        {/* Red spinning arc */}
        <div className="absolute inset-0 rounded-full border-4 border-kas-red animate-spin" 
             style={{ animationDuration: '1.5s', clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)' }}></div>
        
        {/* Green spinning arc */}
        <div className="absolute inset-0 rounded-full border-4 border-kas-green animate-spin" 
             style={{ animationDuration: '1.5s', animationDelay: '0.2s', clipPath: 'polygon(0 66%, 100% 66%, 100% 100%, 0 100%)' }}></div>
        
        {/* White spinning arc */}
        <div className="absolute inset-0 rounded-full border-4 border-white animate-spin" 
             style={{ animationDuration: '1.5s', animationDelay: '0.1s', clipPath: 'polygon(0 33%, 100% 33%, 100% 66%, 0 66%)' }}></div>
        
        {/* Maasai shield overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center animate-float">
            <div className="w-8 h-10 rounded-full bg-kas-red animate-pulse" 
                 style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
          </div>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer bg-200%"></div>
      </div>
      
      {/* Text effect */}
      <div className="absolute mt-32 text-white font-bold flex space-x-1">
        <span className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>L</span>
        <span className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>o</span>
        <span className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>a</span>
        <span className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>d</span>
        <span className="animate-fadeIn" style={{ animationDelay: '0.7s' }}>i</span>
        <span className="animate-fadeIn" style={{ animationDelay: '0.8s' }}>n</span>
        <span className="animate-fadeIn" style={{ animationDelay: '0.9s' }}>g</span>
        <span className="animate-fadeIn" style={{ animationDelay: '1.0s' }}>.</span>
        <span className="animate-fadeIn" style={{ animationDelay: '1.1s' }}>.</span>
        <span className="animate-fadeIn" style={{ animationDelay: '1.2s' }}>.</span>
      </div>
    </div>
  );
};

export default KenyanFlagLoader;