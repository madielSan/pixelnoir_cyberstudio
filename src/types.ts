export type Format = 'portrait' | 'square' | 'landscape';
export type MediaType = 'image' | 'video';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: MediaType;
  format: Format;
  createdAt: string;
  userId: string;
}