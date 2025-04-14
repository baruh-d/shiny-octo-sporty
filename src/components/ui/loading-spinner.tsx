// src/components/ui/loading-spinner.tsx
"use client";

import React from 'react';

interface KenyanFlagLoaderProps {
  fullPage?: boolean;
}

const KenyanFlagLoader = ({ fullPage }: KenyanFlagLoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'fixed inset-0 bg-black bg-opacity-50 z-50' : ''}`}>
      <div className="relative w-24 h-24">
        {/* Black circle base */}
        <div className="absolute inset-0 rounded-full bg-kas-black"></div>
        
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
          <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
            <div className="w-8 h-10 rounded-full bg-kas-red" 
                 style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
          </div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="mt-8 text-white font-bold">
        Loading...
      </div>
    </div>
  );
};

export default KenyanFlagLoader;