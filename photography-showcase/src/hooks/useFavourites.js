import { useState, useEffect } from 'react';

const STORAGE_KEY = 'favouritePhotos';

export const useFavourites = () => {
  const [favouritePhotos, setFavouritePhotos] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavouritePhotos(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load favourites from localStorage:', error);
    }
  }, []);

  const handleFavouriteToggle = (photoId) => {
    setFavouritePhotos((prev) => {
      const newFavourites = prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId];
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavourites));
      } catch (error) {
        console.error('Failed to save favourites to localStorage:', error);
      }
      
      return newFavourites;
    });
  };

  const isFavourite = (photoId) => favouritePhotos.includes(photoId);

  return {
    favouritePhotos,
    handleFavouriteToggle,
    isFavourite
  };
}; 