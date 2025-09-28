import React from 'react';
import { Droplet, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-20 bg-green-950/30 backdrop-blur-xl border-b border-emerald-400/30 shadow-lg shadow-emerald-500/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
            <Droplet className="w-10 h-10 text-emerald-400 animate-pulse relative z-10 drop-shadow-lg" />
            <Zap className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-bounce drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
            HydroPulse
          </h1>
          <div className="px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/40 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
            <span className="text-emerald-200 text-sm font-semibold tracking-wider">SMART TAP</span>
          </div>
        </div>
        <p className="text-center text-emerald-100/80 mt-3 max-w-2xl mx-auto text-lg font-light">
          Experience the future of water conservation through intelligent behavioral nudging
        </p>
      </div>
    </header>
  );
};

export default Header;