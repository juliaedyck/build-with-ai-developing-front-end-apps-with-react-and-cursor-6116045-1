import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'


function App() {

  return (

    
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-1 p-4 flex items-center justify-center bg-gray-50">

        <div className="w-full max-w-3xl text-center">
        
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
