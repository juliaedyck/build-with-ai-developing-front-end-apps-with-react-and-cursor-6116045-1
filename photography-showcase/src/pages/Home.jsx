import React, { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/photoModal";

function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoDetails, setSelectedPhotoDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [photoDetails, setPhotoDetails] = useState({}); // Store details for all photos

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("https://pixelford.com/api2/images")
        if (!response.ok) throw new Error("Failed to fetch photos");
        const data = await response.json();
        setPhotos(data);
        console.log("Photo data structure:", data[0]); // Log first photo to see structure
        console.log("Available image fields:", Object.keys(data[0] || {}));
        
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
      console.log(data[0])
    } catch (err) {
      setDetailsError(err.message);
      setSelectedPhotoDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };





  if (loading) return <div className="text-center py-10">Loading photos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => {
          const photoDetail = photoDetails[photo.id];
          return (
            <PhotoCard
              key={photo.id || photo.url}
              imageUrl={photo.url_medium_size}
              title={photo.title}
              categories={photoDetail?.categories || photo.categories}
              onClick={() => handlePhotoSelect(photo)}
            />
          );
        })}
      </main>
      <PhotoModal
        open={!!selectedPhoto}
        onClose={() => { setSelectedPhoto(null); setSelectedPhotoDetails(null); setDetailsError(null); }}
        photo={selectedPhotoDetails || selectedPhoto}
        imageUrl={selectedPhoto?.url_medium_size}
        loading={detailsLoading}
        error={detailsError}
      />
    </>
  );
}

export default Home;