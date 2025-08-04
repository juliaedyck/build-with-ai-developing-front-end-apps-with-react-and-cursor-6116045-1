export const hasCategory = (photo, category, photoDetails) => {
  const photoDetail = photoDetails[photo.id];
  const photoCategories = photo.categories || [];
  const detailCategories = photoDetail?.categories || [];
  return [...photoCategories, ...detailCategories].includes(category);
};

export const matchesSearch = (photo, query, photoDetails) => {
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

export const filterPhotos = (photos, selectedCategory, searchQuery, photoDetails) => {
  return photos
    .filter(photo => selectedCategory === "all" || hasCategory(photo, selectedCategory, photoDetails))
    .filter(photo => matchesSearch(photo, searchQuery, photoDetails));
}; 