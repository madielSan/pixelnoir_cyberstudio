import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Artwork } from '../types';
import { getArtworks } from '../lib/artwork';
import { NeonButton } from '../components/NeonButton';

const getFormatClasses = (format: string) => {
  switch (format) {
    case 'portrait':
      return 'md:grid-cols-[1fr_2fr] max-w-4xl';
    case 'landscape':
      return 'md:grid-cols-[2fr_1fr] max-w-6xl';
    case 'square':
      return 'md:grid-cols-2 max-w-5xl';
    default:
      return 'md:grid-cols-2 max-w-6xl';
  }
};

export const ArtworkDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const artworks = await getArtworks();
        const found = artworks.find(a => a.id === id);
        setArtwork(found || null);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-cyan-400 mb-4">Artwork not found</p>
          <NeonButton onClick={() => navigate('/portfolio')}>
            Return to Portfolio
          </NeonButton>
        </div>
      </div>
    );
  }

  const formatClasses = getFormatClasses(artwork.format);

  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-4">
      <div className={`mx-auto ${formatClasses}`}>
        <button
          onClick={() => navigate('/portfolio')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 col-span-full"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </button>

        <div className={`grid ${formatClasses} gap-8`}>
          <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${
            artwork.format === 'portrait' ? 'aspect-[9/16]' :
            artwork.format === 'landscape' ? 'aspect-[16/9]' :
            'aspect-square'
          }`}>
            {artwork.mediaType === 'image' ? (
              <img
                src={artwork.mediaUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={artwork.mediaUrl}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-cyan-400 mb-2">
                {artwork.title}
              </h1>
              <p className="text-gray-300 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Format:</span>
                <span className="text-cyan-400 capitalize">{artwork.format}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Type:</span>
                <span className="text-cyan-400 capitalize">{artwork.mediaType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Created:</span>
                <span className="text-cyan-400">
                  {new Date(artwork.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};