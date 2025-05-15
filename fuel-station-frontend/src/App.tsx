import './assets/styles/App.css';

function App() {

  return (
    <>
    
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-6 font-[Poppins] tracking-tight">
            SRIKISHNA
        </h1>
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 uppercase font-[Poppins] tracking-wider">
            FILLING STATION
        </h2>
        <div className="flex justify-center space-x-8 mb-12">
            <div className="w-16 h-1 bg-white opacity-60 mt-4"></div>
            <div className="w-16 h-1 bg-white opacity-60 mt-4"></div>
        </div>
        <p className="text-xl text-white opacity-90 max-w-2xl mx-auto font-[Poppins]">
            Premium fuel services since 2019 • 24/7 availability
        </p>
    </div>
    </>
  )
}

export default App
