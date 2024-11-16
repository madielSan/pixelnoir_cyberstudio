import React, { useState, useEffect, useMemo } from 'react';
import { Format, MediaType, Artwork } from '../types';
import { Filter, Grid } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { getArtworks } from '../lib/artwork';
import { useNavigate } from 'react-router-dom';

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ${
      active
        ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

const getAspectRatioClass = (format: Format) => {
  switch (format) {
    case 'portrait':
      return 'aspect-[9/16]';
    case 'landscape':
      return 'aspect-[16/9]';
    case 'square':
      return 'aspect-square';
    default:
      return 'aspect-square';
  }
};

export const PortfolioGrid: React.FC = () => {
  const navigate = useNavigate();
  const [formatFilter, setFormatFilter] = useState<Format | 'all'>('all');
  const [mediaFilter, setMediaFilter] = useState<MediaType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showingInfo, setShowingInfo] = useState<string | null>(null);

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      const loadedArtworks = await getArtworks();
      setArtworks(loadedArtworks);
    } catch (error) {
      console.error('Error loading artworks:', error);
    }
  };

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter(artwork => {
        if (formatFilter !== 'all' && artwork.format !== formatFilter) return false;
        if (mediaFilter !== 'all' && artwork.mediaType !== mediaFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return a.title.localeCompare(b.title);
      });
  }, [artworks, formatFilter, mediaFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter className="w-5 h-5 text-cyan-400" />
          <div className="flex gap-2 flex-wrap">
            <FilterButton
              active={formatFilter === 'all'}
              onClick={() => setFormatFilter('all')}
            >
              All Formats
            </FilterButton>
            <FilterButton
              active={formatFilter === 'portrait'}
              onClick={() => setFormatFilter('portrait')}
            >
              Portrait
            </FilterButton>
            <FilterButton
              active={formatFilter === 'landscape'}
              onClick={() => setFormatFilter('landscape')}
            >
              Landscape
            </FilterButton>
            <FilterButton
              active={formatFilter === 'square'}
              onClick={() => setFormatFilter('square')}
            >
              Square
            </FilterButton>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Grid className="w-5 h-5 text-cyan-400" />
          <div className="flex gap-2 flex-wrap">
            <FilterButton
              active={mediaFilter === 'all'}
              onClick={() => setMediaFilter('all')}
            >
              All Media
            </FilterButton>
            <FilterButton
              active={mediaFilter === 'image'}
              onClick={() => setMediaFilter('image')}
            >
              Images
            </FilterButton>
            <FilterButton
              active={mediaFilter === 'video'}
              onClick={() => setMediaFilter('video')}
            >
              Videos
            </FilterButton>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <div
            key={artwork.id}
            className={`group relative ${getAspectRatioClass(artwork.format)} overflow-hidden rounded-lg bg-gray-900`}
            onMouseEnter={() => setHoveredItem(artwork.id)}
            onMouseLeave={() => {
              setHoveredItem(null);
              setShowingInfo(null);
            }}
          >
            {artwork.mediaType === 'image' ? (
              <div 
                className="relative w-full h-full"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const y = e.clientY - rect.top;
                  setShowingInfo(y < rect.height / 3 ? artwork.id : null);
                }}
              >
                <img
                  src={artwork.mediaUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ) : (
              <div 
                className="relative w-full h-full"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const y = e.clientY - rect.top;
                  setShowingInfo(y < rect.height / 3 ? artwork.id : null);
                }}
              >
                <video
                  src={artwork.mediaUrl}
                  className="w-full h-full object-cover"
                  controls={hoveredItem === artwork.id && showingInfo !== artwork.id}
                  loop
                  muted
                  playsInline
                />
              </div>
            )}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent transition-opacity duration-300 ${
                showingInfo === artwork.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{artwork.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{artwork.description}</p>
                <NeonButton
                  onClick={() => navigate(`/artwork/${artwork.id}`)}
                  className="text-sm py-1"
                >
                  View Details
                </NeonButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};