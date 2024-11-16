export interface Artwork {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  format: 'portrait' | 'square' | 'landscape';
  createdAt: string;
}

export type Format = 'portrait' | 'square' | 'landscape';
export type MediaType = 'image' | 'video';