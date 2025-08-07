import React, { useState, useCallback, useEffect } from "react";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/photoModal";
import CategoryFilter from "../components/CategoryFilter";
import { usePhotos } from "../hooks/usePhotos";
import { usePhotoModal } from "../hooks/usePhotoModal";
import { useFavourites } from "../hooks/useFavourites";
import { filterPhotos } from "../utils/photoFilters";

function Home() {
  const { photos, loading, error, photoDetails } = usePhotos();
  const { selectedPhoto, selectedPhotoDetails, detailsLoading, detailsError, handlePhotoSelect, closeModal } = usePhotoModal();
  const { handleFavouriteToggle, isFavourite } = useFavourites();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);

  const categories = ["all", "fauna", "flora", "people", "interiors", "landscapes"];
  const filteredPhotos = filterPhotos(photos, selectedCategory, searchQuery, photoDetails);

  // Set initial render to false after first render cycle
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100); // Small delay to ensure animations start
    return () => clearTimeout(timer);
  }, []);

  console.log('Home render:', { isInitialRender, photoCount: filteredPhotos.length }); // Debug log

  // Memoized PhotoCard component to prevent unnecessary re-renders
  const MemoizedPhotoCard = useCallback(({ photo, index }) => {
    const handleClick = useCallback(() => {
      handlePhotoSelect(photo);
    }, [handlePhotoSelect, photo]);

    const handleFavouriteClick = useCallback(() => {
      handleFavouriteToggle(photo.id);
    }, [handleFavouriteToggle, photo.id]);

    // Temporarily force animation to always be true for testing
    const shouldAnimate = true; // isInitialRender;

    return (
      <PhotoCard
        imageUrl={photo.url_medium_size}
        title={photo.title}
        categories={photoDetails[photo.id]?.categories || photo.categories}
        onClick={handleClick}
        isSelected={selectedPhoto?.id === photo.id}
        isFavourite={isFavourite(photo.id)}
        onFavouriteToggle={handleFavouriteClick}
        index={index}
        shouldAnimate={shouldAnimate}
      />
    );
  }, [handlePhotoSelect, handleFavouriteToggle, photoDetails, selectedPhoto?.id, isFavourite, isInitialRender]);

  if (loading) return <div className="text-center py-10">Loading photos...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>
<CategoryFilter categories={categories} onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
           <div className="mb-6">
        <label htmlFor="search-photos" className="block text-sm font-medium text-gray-700 mb-2">
          Search Photos
        </label>
        <div className="relative">
          <input
            id="search-photos"
            type="search"
            placeholder="Search by title, description, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
            aria-describedby="search-description"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p id="search-description" className="mt-1 text-sm text-gray-500">
          Search through photo titles, descriptions, and categories
        </p>
      </div>
     
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-start justify-start">
          {filteredPhotos.map((photo, index) => (
            <MemoizedPhotoCard key={photo.id || photo.url} photo={photo} index={index} />
          ))}
        </div>
      </main>
      <PhotoModal
        open={!!selectedPhoto}
        onClose={closeModal}
        photo={selectedPhotoDetails || selectedPhoto}
        imageUrl={selectedPhoto?.url_medium_size}
        loading={detailsLoading}
        error={detailsError}
      />
    </>
  );
}

export default Home;