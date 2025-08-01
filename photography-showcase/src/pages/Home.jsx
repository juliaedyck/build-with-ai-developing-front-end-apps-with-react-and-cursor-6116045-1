import React, { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/photoModal";
import { photos } from "../data"
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [favouritePhotos, setFavouritePhotos] = useState([]); // array of photo ids
  const [selectedPhotoDetails, setSelectedPhotoDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [photoDetails, setPhotoDetails] = useState({}); // Store details for all photos
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const hasCategory = (photo, category) => {
    const photoDetail = photoDetails[photo.id];
    const photoCategories = photo.categories || [];
    const detailCategories = photoDetail?.categories || [];
    return [...photoCategories, ...detailCategories].includes(category);
  };

  const matchesSearch = (photo, query) => {
    if (!query.trim()) return true;
    
    const photoDetail = photoDetails[photo.id];
    const searchTerm = query.toLowerCase();
    
    // Search in title
    const title = photo.title?.toLowerCase() || '';
    if (title.includes(searchTerm)) return true;
    
    // Search in description
    const description = photoDetail?.description?.toLowerCase() || '';
    if (description.includes(searchTerm)) return true;
    
    // Search in keywords (handle both string and array formats)
    let keywords = '';
    if (photoDetail?.keywords) {
      if (Array.isArray(photoDetail.keywords)) {
        keywords = photoDetail.keywords.join(' ').toLowerCase();
      } else {
        keywords = photoDetail.keywords.toLowerCase();
      }
    }
    if (keywords.includes(searchTerm)) return true;
    
    // Search in categories
    const photoCategories = photo.categories || [];
    const detailCategories = photoDetail?.categories || [];
    const allCategories = [...photoCategories, ...detailCategories];
    if (allCategories.some(cat => cat.toLowerCase().includes(searchTerm))) return true;
    
    return false;
  };

  const filteredPhotos = photos
    .filter(photo => selectedCategory === "all" || hasCategory(photo, selectedCategory))
    .filter(photo => matchesSearch(photo, searchQuery));
  

  const categories = ["all", "fauna", "flora", "people", "interiors", "landscapes"];

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

  const handleFavouriteToggle = (photoId) => {
    setFavouritePhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

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
     
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => {
          const photoDetail = photoDetails[photo.id];
          return (
            <PhotoCard
              key={photo.id || photo.url}
              imageUrl={photo.url_medium_size}
              title={photo.title}
              categories={photoDetail?.categories || photo.categories}
              onClick={() => handlePhotoSelect(photo)}
              isSelected={selectedPhoto?.id === photo.id}
              isFavourite={favouritePhotos.includes(photo.id)}
              onFavouriteToggle={() => handleFavouriteToggle(photo.id)}
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