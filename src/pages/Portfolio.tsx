import React from 'react';
import { PortfolioGrid } from '../components/PortfolioGrid';

export const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="pt-8 pb-4 px-4">
        <h1 className="text-4xl font-cyberpunk text-center text-cyan-400 mb-2">Portfolio</h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">
          Explore our digital masterpieces across different formats and mediums.
          Each piece tells a unique story in the language of pixels and light.
        </p>
      </div>
      <PortfolioGrid />
    </div>
  );
};