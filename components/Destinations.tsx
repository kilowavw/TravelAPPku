import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, X, Maximize2, ExternalLink } from 'lucide-react';
import { Destination } from '../types';

// Declare global Leaflet variable
declare global {
  interface Window {
    L: any;
  }
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Raja Ampat",
    location: "Papua Barat, Indonesia",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9dab?q=80&w=2070&auto=format&fit=crop",
    description: "Surga bawah laut dengan keanekaragaman hayati terkaya di dunia. Terdiri dari lebih dari 1.500 pulau kecil, pulau karang, dan beting yang mengelilingi empat pulau utama. Tempat ini adalah rumah bagi 75% spesies karang dunia.",
    rating: 4.9,
    coordinates: { lat: -0.2333, lng: 130.5167 }
  },
  {
    id: 2,
    name: "Ubud",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
    description: "Pusat seni dan budaya Bali yang terletak di tengah sawah terasering yang hijau dan hutan hujan yang rimbun. Ubud dikenal sebagai tempat penyembuhan holistik, yoga, dan kuliner organik.",
    rating: 4.8,
    coordinates: { lat: -8.5069, lng: 115.2625 }
  },
  {
    id: 3,
    name: "Gunung Bromo",
    location: "Jawa Timur, Indonesia",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9e6d8c272?q=80&w=2071&auto=format&fit=crop",
    description: "Gunung berapi aktif yang terletak di dalam kaldera Tengger yang sangat besar. Terkenal dengan pemandangan matahari terbit yang spektakuler dan suasana mistis di lautan pasirnya.",
    rating: 4.9,
    coordinates: { lat: -7.9425, lng: 112.9530 }
  },
  {
    id: 4,
    name: "Labuan Bajo",
    location: "NTT, Indonesia",
    image: "https://images.unsplash.com/photo-1596401057633-565652b8ddbe?q=80&w=1933&auto=format&fit=crop",
    description: "Kota pelabuhan kecil yang menjadi gerbang utama menuju Taman Nasional Komodo. Menawarkan pemandangan matahari terbenam yang luar biasa dan akses ke pulau-pulau eksotis seperti Pulau Padar.",
    rating: 4.7,
    coordinates: { lat: -8.4964, lng: 119.8877 }
  },
  {
    id: 5,
    name: "Kyoto",
    location: "Jepang",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    description: "Ibu kota budaya Jepang yang dipenuhi dengan kuil Buddha klasik, taman, istana kekaisaran, kuil Shinto, dan rumah kayu tradisional. Tempat terbaik untuk menikmati musim gugur dan sakura.",
    rating: 4.9,
    coordinates: { lat: 35.0116, lng: 135.7681 }
  },
  {
    id: 6,
    name: "Danau Toba",
    location: "Sumatera Utara, Indonesia",
    image: "https://images.unsplash.com/photo-1555050556-9d39c947d963?q=80&w=2071&auto=format&fit=crop",
    description: "Danau vulkanik terbesar di dunia yang terbentuk dari letusan supervolcano purba. Di tengahnya terdapat Pulau Samosir yang kaya akan budaya Batak yang unik.",
    rating: 4.6,
    coordinates: { lat: 2.6167, lng: 98.6667 }
  }
];

// Leaflet Map Component
const LeafletMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || !window.L) return;

    // Initialize map if not already initialized
    if (!mapInstance.current) {
      mapInstance.current = window.L.map(mapContainer.current).setView([lat, lng], 13);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current);

      window.L.marker([lat, lng]).addTo(mapInstance.current);
    } else {
      // Update view if props change
      mapInstance.current.setView([lat, lng], 13);
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lng]);

  return <div ref={mapContainer} className="w-full h-full rounded-xl z-10" />;
};

const Destinations: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-24 bg-nature-50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sand-700 font-bold tracking-widest uppercase text-sm">Pilihan Favorit</span>
          <h2 className="font-serif text-4xl md:text-5xl text-nature-900 mt-2">Destinasi Populer</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              layoutId={`card-${dest.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedDest(dest)}
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nature-900/90 via-nature-900/20 to-transparent opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="flex items-center gap-2 mb-2 text-sand-300 text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  {dest.location}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">{dest.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-white text-sm font-bold">{dest.rating}</span>
                  </div>
                  <button className="p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-nature-900/80 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`card-${selectedDest.id}`}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 scrollbar-hide"
            >
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="h-64 md:h-auto relative">
                  <img
                    src={selectedDest.image}
                    alt={selectedDest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nature-900/60 to-transparent md:hidden" />
                  <div className="absolute bottom-0 left-0 p-6 text-white md:hidden">
                    <h3 className="font-serif text-3xl font-bold">{selectedDest.name}</h3>
                    <p className="text-sand-200">{selectedDest.location}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="hidden md:block mb-6">
                    <h3 className="font-serif text-4xl font-bold text-nature-900 mb-2">{selectedDest.name}</h3>
                    <div className="flex items-center gap-2 text-nature-500">
                      <MapPin className="w-5 h-5" />
                      {selectedDest.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-sand-100 px-3 py-1 rounded-full text-sand-800 text-sm font-bold">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {selectedDest.rating} Rating
                    </div>
                    <span className="text-nature-400 text-sm">Terfavorit 2024</span>
                  </div>

                  <p className="text-nature-700 leading-relaxed mb-8">
                    {selectedDest.description}
                  </p>

                  <h4 className="font-serif text-lg text-nature-900 font-bold mb-4">Lokasi di Peta</h4>
                  <div className="w-full h-48 bg-nature-100 rounded-xl overflow-hidden mb-6 border border-nature-200 shadow-inner">
                    <LeafletMap lat={selectedDest.coordinates.lat} lng={selectedDest.coordinates.lng} />
                  </div>

                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDest.name + ' ' + selectedDest.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-nature-800 text-white rounded-xl font-bold hover:bg-nature-700 transition-all shadow-lg hover:shadow-nature-800/30"
                  >
                    Buka di Google Maps
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Destinations;