import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-nature-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm tracking-widest uppercase text-white/90 mb-4 backdrop-blur-sm"
        >
          Jelajahi Dunia Bersama Kami
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Temukan Keajaiban <br/> <span className="text-sand-400 italic">Alam Semesta</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light"
        >
          Biarkan AI kami merancang perjalanan impian Anda. Dari pegunungan yang megah hingga pantai yang tenang, petualangan Anda dimulai di sini.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a 
            href="#planner"
            className="inline-block bg-white text-nature-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-sand-400 hover:text-white transition-all duration-300 shadow-xl"
          >
            Buat Rencana Perjalanan
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

export default Hero;