import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative inline-block text-cyan-400 animate-pulse">
        {text}
        <span className="absolute -inset-0.5 text-magenta-500 opacity-70 animate-glitch1"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
          {text}
        </span>
        <span className="absolute -inset-0.5 text-violet-500 opacity-70 animate-glitch2"
              style={{ clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)' }}>
          {text}
        </span>
      </span>
    </div>
  );
};