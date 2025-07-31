import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { photos } from './data'


function App() {
  const [count, setCount] = useState(0)

  return (

    
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-1 p-4 flex items-center justify-center bg-gray-50">

        <div className="w-full max-w-3xl text-center">
          <p className="text-lg text-gray-700">Welcome to the Photography Showcase! Add your content here.</p>
          {/* Render the Home page here */} 
          <Home />


        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
