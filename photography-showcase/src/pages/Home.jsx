import React from "react";
import PhotoCard from "../components/PhotoCard";
import { photos } from "../data";

function Home() {







  return (
    <>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            imageUrl={photo.image}
            title={photo.title}
            category={photo.category}
          />
        ))}
      </main>
    </>
  );
}

export default Home;