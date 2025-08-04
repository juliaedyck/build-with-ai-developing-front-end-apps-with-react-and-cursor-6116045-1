import { useState } from 'react';

export const usePhotoModal = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoDetails, setSelectedPhotoDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const handlePhotoSelect = async (photo) => {
    setSelectedPhoto(photo);
    setDetailsLoading(true);
    setDetailsError(null);
    setSelectedPhotoDetails(null);
    
    try {
      const response = await fetch(`https://pixelford.com/api2/image?id=${photo.id}`);
      if (!response.ok) throw new Error("Failed to fetch photo details");
      const data = await response.json();
      setSelectedPhotoDetails(data[0]);
    } catch (err) {
      setDetailsError(err.message);
      setSelectedPhotoDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setSelectedPhotoDetails(null);
    setDetailsError(null);
  };

  return {
    selectedPhoto,
    selectedPhotoDetails,
    detailsLoading,
    detailsError,
    handlePhotoSelect,
    closeModal
  };
}; 