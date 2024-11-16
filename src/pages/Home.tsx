import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlitchText } from '../components/GlitchText';
import { NeonButton } from '../components/NeonButton';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(6,182,212,0.15) 0%,
            rgba(6,182,212,0.05) 25%,
            transparent 50%
          )
        `
      }}
    >
      {/* Cyberpunk grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("../public/images/madielsan_Ultra-realistic_cyberpunk_cityscape_at_night_bustling_ab7acdd1-47c6-47fe-965c-e65af0729e04.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(120%) brightness(50%)'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="relative mb-8">
          <GlitchText
            text="PIXEL NOIR"
            className="text-7xl md:text-9xl font-cyberpunk tracking-wider"
          />
          <h2 className="text-2xl md:text-4xl font-light text-cyan-400 mt-4">
            CYBERSTUDIO
          </h2>
        </div>

        <p className="max-w-2xl mx-auto text-gray-300 mb-12 leading-relaxed text-lg">
          Where digital dreams materialize in neon-soaked pixels. We craft visual experiences 
          that blur the lines between reality and digital artistry.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NeonButton onClick={() => navigate('/portfolio')}>
            EXPLORE PORTFOLIO
          </NeonButton>
          <NeonButton onClick={() => navigate('/contact')} variant="secondary">
            CONTACT US
          </NeonButton>
        </div>
      </div>

      {/* Animated corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500 opacity-50" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500 opacity-50" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950 opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </div>
  );
};