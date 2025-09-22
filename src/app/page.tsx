export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          HR Arsenal
        </h1>
      </div>
      
      <div className="relative flex place-items-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to HR Arsenal
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            A comprehensive HR management system
          </p>
          
          <div className="flex gap-4 justify-center">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              disabled
            >
              Coming Soon: Employee Management
            </button>
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
              disabled
            >
              Coming Soon: Department Management
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}


