import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, LogIn, LogOut } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { Artwork, Format, MediaType } from '../types';
import { addArtwork, getArtworks, deleteArtwork, uploadImage } from '../lib/artwork';
import { signIn, signOut, onAuthChange } from '../lib/auth';
import { User } from 'firebase/auth';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [format, setFormat] = useState<Format>('landscape');
  const [file, setFile] = useState<File | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      if (user && isOpen) {
        loadArtworks();
      }
    });

    return () => unsubscribe();
  }, [isOpen]);

  const loadArtworks = async () => {
    try {
      const fetchedArtworks = await getArtworks();
      setArtworks(fetchedArtworks);
    } catch (error) {
      console.error('Error loading artworks:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      setLoginError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      setUploadError(null);
      const url = await uploadImage(selectedFile);
      setMediaUrl(url);
      setFile(selectedFile);
      setMediaType(selectedFile.type.startsWith('image/') ? 'image' : 'video');
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload file');
      setFile(null);
      setMediaUrl('');
      e.target.value = '';
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !mediaUrl) return;

    try {
      setIsLoading(true);
      await addArtwork({
        title,
        description,
        mediaUrl,
        mediaType,
        format,
        createdAt: new Date().toISOString(),
        userId: user!.uid
      });
      
      setTitle('');
      setDescription('');
      setMediaUrl('');
      setFile(null);
      await loadArtworks();
    } catch (error) {
      console.error('Error adding artwork:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to add artwork');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteArtwork(id);
      await loadArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-cyan-900/50 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-cyan-900/50">
          <h2 className="text-xl font-cyberpunk text-cyan-400">Admin Panel</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!user ? (
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-sm">{loginError}</p>
            )}

            <NeonButton type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
              <LogIn className="w-4 h-4" />
              {isLoading ? 'Logging in...' : 'Login'}
            </NeonButton>
          </form>
        ) : (
          <>
            <div className="p-4 border-b border-cyan-900/50 flex justify-between items-center">
              <span className="text-gray-400">Logged in as {user.email}</span>
              <NeonButton
                onClick={handleLogout}
                className="!border-gray-600 !text-gray-400 hover:!text-gray-200 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </NeonButton>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm text-gray-400 mb-1">
                  Media File
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
                {uploadError && (
                  <p className="text-red-400 text-sm mt-1">{uploadError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mediaType" className="block text-sm text-gray-400 mb-1">
                    Media Type
                  </label>
                  <select
                    id="mediaType"
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as MediaType)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="format" className="block text-sm text-gray-400 mb-1">
                    Format
                  </label>
                  <select
                    id="format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as Format)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                    <option value="square">Square</option>
                  </select>
                </div>
              </div>

              <NeonButton 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isLoading || !mediaUrl}
              >
                <Upload className="w-4 h-4" />
                {isLoading ? 'Adding Artwork...' : 'Add Artwork'}
              </NeonButton>
            </form>

            <div className="p-6 border-t border-cyan-900/50">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Manage Artworks</h3>
              <div className="space-y-4">
                {artworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <div>
                      <h4 className="text-gray-200 font-medium">{artwork.title}</h4>
                      <p className="text-gray-400 text-sm">{artwork.description}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(artwork.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      disabled={isLoading}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};