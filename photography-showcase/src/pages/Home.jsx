import React, { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/photoModal";
import { photos } from "../data"

function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [favouritePhotos, setFavouritePhotos] = useState([]); // array of photo ids

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("https://pixelford.com/api2/images")
        if (!response.ok) throw new Error("Failed to fetch photos");
        const data = await response.json();
        setPhotos(data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const handleFavouriteToggle = (photoId) => {
    setFavouritePhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  if (loading) return <div className="text-center py-10">Loading photos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id || photo.url}
            imageUrl={photo.url_medium_size}
            title={photo.title}
            category={photo.category}
            onClick={() => setSelectedPhoto(photo)}
            isSelected={selectedPhoto?.id === photo.id}
            isFavourite={favouritePhotos.includes(photo.id)}
            onFavouriteToggle={() => handleFavouriteToggle(photo.id)}
          />
        ))}
      </main>
      <PhotoModal
        open={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        photo={selectedPhoto}
      />
    </>
  );
}

export default Home;