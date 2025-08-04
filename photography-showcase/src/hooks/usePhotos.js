import { useState, useEffect } from 'react';

export const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoDetails, setPhotoDetails] = useState({});

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("https://pixelford.com/api2/images");
        if (!response.ok) throw new Error("Failed to fetch photos");
        const data = await response.json();
        setPhotos(data);
        
        // Fetch details for all photos
        const detailsPromises = data.map(async (photo) => {
          try {
            const detailsResponse = await fetch(`https://pixelford.com/api2/image?id=${photo.id}`);
            if (detailsResponse.ok) {
              const detailsData = await detailsResponse.json();
              return { id: photo.id, details: detailsData[0] };
            }
          } catch (err) {
            console.error(`Failed to fetch details for photo ${photo.id}:`, err);
            return { id: photo.id, details: null };
          }
        });
        
        const detailsResults = await Promise.all(detailsPromises);
        const detailsMap = {};
        detailsResults.forEach(({ id, details }) => {
          if (details) {
            detailsMap[id] = details;
          }
        });
        setPhotoDetails(detailsMap);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  return { photos, loading, error, photoDetails };
}; 