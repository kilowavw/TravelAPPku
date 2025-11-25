import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Calendar, Map as MapIcon, Wallet, Heart, CheckCircle2, Compass, ExternalLink, MapPin } from 'lucide-react';
import { generateTravelPlan } from '../services/gemini';
import { TravelPreferences, ItineraryResponse } from '../types';

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ItineraryResponse | null>(null);
  const [formData, setFormData] = useState<TravelPreferences>({
    destination: '',
    duration: '',
    budget: '',
    interests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination || !formData.duration) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await generateTravelPlan(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Maaf, terjadi kesalahan saat membuat rencana perjalanan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-transparent border-b-2 border-nature-200 focus:border-nature-600 text-nature-800 py-3 px-2 outline-none transition-colors font-sans text-lg placeholder-nature-300";

  return (
    <section id="planner" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sand-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-nature-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Form Section */}
          <div className="w-full lg:w-1/3 sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-nature-900 mb-6">
                Rencanakan <br/> <span className="italic text-sand-600">Perjalanan Impian</span>
              </h2>
              <p className="text-nature-600 mb-10 text-lg">
                Beritahu kami preferensi Anda, dan biarkan AI kami menyusun itinerary lengkap dengan foto lokasi dan panduan peta.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-nature-100 shadow-sm">
                <div className="group">
                  <label className="flex items-center gap-2 text-nature-500 mb-1 text-sm font-semibold uppercase tracking-wider">
                    <MapIcon className="w-4 h-4" /> Tujuan
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Misal: Bali, Labuan Bajo, Tokyo"
                    className={inputClasses}
                    required
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-nature-500 mb-1 text-sm font-semibold uppercase tracking-wider">
                    <Calendar className="w-4 h-4" /> Durasi (Hari)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Maksimal 7 hari disarankan"
                    max={14}
                    className={inputClasses}
                    required
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-nature-500 mb-1 text-sm font-semibold uppercase tracking-wider">
                    <Wallet className="w-4 h-4" /> Perkiraan Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="" disabled>Pilih Budget</option>
                    <option value="Hemat">Hemat (Backpacker)</option>
                    <option value="Menengah">Menengah (Standar)</option>
                    <option value="Mewah">Mewah (Luxury)</option>
                  </select>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-nature-500 mb-1 text-sm font-semibold uppercase tracking-wider">
                    <Heart className="w-4 h-4" /> Minat & Hobi
                  </label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Kuliner, Alam, Sejarah, Belanja..."
                    className={inputClasses}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-nature-800 text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-nature-700 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-nature-800/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Sedang Meracik...
                    </>
                  ) : (
                    <>
                      Buat Rencana <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Result Section */}
          <div className="w-full lg:w-2/3 min-h-[500px]">
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-nature-200 rounded-3xl bg-nature-50/50"
                >
                  <Compass className="w-24 h-24 text-nature-300 mb-6" strokeWidth={1} />
                  <h3 className="text-2xl font-serif text-nature-400">Rencana perjalanan Anda akan muncul di sini</h3>
                  <p className="text-nature-300 mt-2 max-w-sm">
                    Tips: Gunakan durasi 3-5 hari untuk hasil paling detail dan akurat.
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-12"
                >
                  <div className="w-16 h-16 border-4 border-sand-300 border-t-nature-600 rounded-full animate-spin mb-6"></div>
                  <p className="text-nature-600 animate-pulse text-lg font-medium">AI sedang menyusun itinerary...</p>
                  <p className="text-nature-400 text-sm mt-2">Mencari lokasi terbaik & mengumpulkan foto...</p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="space-y-8"
                >
                  {/* Header Result */}
                  <div className="bg-nature-50 rounded-3xl p-8 shadow-sm border border-nature-100">
                    <h3 className="font-serif text-3xl md:text-4xl text-nature-900 mb-4 leading-tight">{result.tripTitle}</h3>
                    <p className="text-nature-700 text-lg italic border-l-4 border-sand-400 pl-4 py-1 bg-white/50 rounded-r-lg">
                      "{result.summary}"
                    </p>
                  </div>

                  {/* Itinerary Timeline */}
                  <div className="space-y-12">
                    {result.itinerary.map((day) => (
                      <div key={day.day} className="relative pl-0 md:pl-8">
                         {/* Desktop Timeline Line */}
                        <div className="hidden md:block absolute left-[11px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-sand-400 to-transparent" />
                        
                        <div className="flex items-center gap-4 mb-6">
                           <div className="hidden md:flex flex-shrink-0 w-6 h-6 bg-sand-500 rounded-full ring-4 ring-white items-center justify-center text-white text-xs font-bold z-10">
                              {day.day}
                           </div>
                           <h4 className="text-2xl font-serif font-bold text-nature-800 bg-white px-4 py-2 rounded-lg shadow-sm border border-nature-100">
                             Hari ke-{day.day}: <span className="text-nature-600">{day.theme}</span>
                           </h4>
                        </div>
                        
                        <div className="space-y-6">
                          {day.activities.map((act, idx) => (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-nature-100 flex flex-col md:flex-row"
                            >
                              {/* Activity Image */}
                              <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden relative bg-nature-200">
                                <img 
                                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(act.imageKeyword)}?width=400&height=400&nologo=true`}
                                  alt={act.activity}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  loading="lazy"
                                />
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                  {act.time}
                                </div>
                              </div>

                              {/* Activity Content */}
                              <div className="p-6 flex flex-col justify-between flex-grow">
                                <div>
                                  <h5 className="text-xl font-bold text-nature-900 mb-2">{act.activity}</h5>
                                  <div className="flex items-center gap-2 text-sm text-nature-500 mb-3 bg-nature-50 w-fit px-2 py-1 rounded-md">
                                    <MapPin className="w-3 h-3" />
                                    {act.location}
                                  </div>
                                  <p className="text-nature-600 text-sm leading-relaxed mb-4">
                                    {act.description}
                                  </p>
                                </div>

                                {/* Map Button */}
                                <a 
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.location + ' ' + formData.destination)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 bg-sand-50 hover:bg-sand-100 text-nature-800 text-sm font-semibold rounded-lg border border-sand-200 transition-colors"
                                >
                                  <MapIcon className="w-4 h-4" />
                                  Lihat di Google Maps
                                  <ExternalLink className="w-3 h-3 text-nature-400" />
                                </a>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 p-4 bg-sand-100 rounded-xl flex items-start gap-4 text-nature-800 border border-sand-200">
                    <CheckCircle2 className="w-6 h-6 text-nature-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Catatan:</p>
                      <p className="text-sm text-nature-700">
                        Itinerary ini dibuat otomatis oleh AI. Gambar adalah ilustrasi yang digenerate oleh AI berdasarkan lokasi.
                        Selalu periksa ketersediaan tempat dan jam operasional terbaru melalui Google Maps.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlanner;