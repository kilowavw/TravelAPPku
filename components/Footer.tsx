import React from 'react';
import { Compass, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nature-900 text-nature-100 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-nature-800 pb-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-8 h-8 text-sand-400" />
              <span className="font-serif text-2xl font-bold">TerraNova</span>
            </div>
            <p className="text-nature-300 text-sm leading-relaxed">
              Membantu Anda menemukan keindahan dunia dengan cara yang personal dan tak terlupakan. Jelajahi tanpa batas.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Perusahaan</h4>
            <ul className="space-y-4 text-nature-300 text-sm">
              <li><a href="#" className="hover:text-sand-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-sand-400 transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-sand-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-sand-400 transition-colors">Partner</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">Dukungan</h4>
            <ul className="space-y-4 text-nature-300 text-sm">
              <li><a href="#" className="hover:text-sand-400 transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-sand-400 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-sand-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-sand-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">Hubungi Kami</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-nature-800 flex items-center justify-center hover:bg-sand-500 hover:text-nature-900 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-nature-800 flex items-center justify-center hover:bg-sand-500 hover:text-nature-900 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-nature-800 flex items-center justify-center hover:bg-sand-500 hover:text-nature-900 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-nature-300 text-sm">
              <Mail className="w-4 h-4" />
              <span>hello@terranova.id</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-nature-400">
          <p>&copy; {new Date().getFullYear()} TerraNova Travel. All rights reserved.</p>
          <p>Dibuat dengan ❤️ untuk para penjelajah.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;