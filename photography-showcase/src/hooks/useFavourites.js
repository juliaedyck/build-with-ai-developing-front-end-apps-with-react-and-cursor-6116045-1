import { useState } from 'react';

export const useFavourites = () => {
  const [favouritePhotos, setFavouritePhotos] = useState([]);

  const handleFavouriteToggle = (photoId) => {
    setFavouritePhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const isFavourite = (photoId) => favouritePhotos.includes(photoId);

  return {
    favouritePhotos,
    handleFavouriteToggle,
    isFavourite
  };
}; 