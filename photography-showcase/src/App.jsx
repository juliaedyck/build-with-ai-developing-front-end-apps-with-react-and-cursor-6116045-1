import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Photography Showcase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             
            </p>
          </div>
        </div>
          
       
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
