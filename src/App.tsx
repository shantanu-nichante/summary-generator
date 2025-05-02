import React from 'react';
import { CircleUser } from 'lucide-react';
import TextProcessor from './components/TextProcessor';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-teal-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CircleUser className="h-8 w-8 text-violet-600" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-teal-500 bg-clip-text text-transparent">
              Summarize & Visualize
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Transform Text into Visual Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload or paste your text, then watch as AI generates a concise summary and creates 
            unique visuals based on your content.
          </p>
        </section>

        <TextProcessor />
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 Summarize & Visualize. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;