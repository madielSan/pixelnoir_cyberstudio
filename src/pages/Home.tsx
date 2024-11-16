import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlitchText } from '../components/GlitchText';
import { NeonButton } from '../components/NeonButton';
import { Play } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <>
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
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent" />
      </div>

      {/* Video Section */}
      <section className="relative py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden cyber-border">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                poster="/images/video-thumbnail.jpg"
                src="/images/hero-video.mp4"
              >
                <source src="/images/Pixel_Noir_Vitrine.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
                <button 
                  className="p-6 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 transition-transform duration-300 hover:scale-110"
                  onClick={() => videoRef.current?.play()}
                >
                  <Play className="w-12 h-12" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};