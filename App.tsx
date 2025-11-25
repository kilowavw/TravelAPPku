import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import AIPlanner from './components/AIPlanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans text-nature-900 antialiased selection:bg-sand-300 selection:text-nature-900">
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <AIPlanner />
        
        {/* About Section (Simple) */}
        <section id="about" className="py-24 bg-nature-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
               style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'}}></div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Filosofi Perjalanan Kami</h2>
            <p className="text-xl md:text-2xl font-light text-nature-200 max-w-4xl mx-auto leading-relaxed">
              "Kami percaya bahwa perjalanan bukan sekadar berpindah tempat, tetapi tentang menemukan bagian diri yang hilang di antara kemegahan alam dan kehangatan budaya baru."
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;