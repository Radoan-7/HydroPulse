import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Hand, Droplet } from 'lucide-react';

interface TapSimulationProps {
  handsDetected: boolean;
  setHandsDetected: (detected: boolean) => void;
  isRunning: boolean;
  waterWasted: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const TapSimulation: React.FC<TapSimulationProps> = ({
  handsDetected,
  setHandsDetected,
  isRunning,
  waterWasted,
  onStart,
  onStop,
  onReset
}) => {
  const [showHandAnimation, setShowHandAnimation] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isRunning) {
      // Simulate random hand movements
      timeout = setTimeout(() => {
        const shouldShowHands = Math.random() > 0.6;
        setHandsDetected(shouldShowHands);
        setShowHandAnimation(shouldShowHands);
        
        if (shouldShowHands) {
          setTimeout(() => {
            setShowHandAnimation(false);
            setHandsDetected(false);
          }, 2000 + Math.random() * 3000);
        }
      }, 1000 + Math.random() * 2000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isRunning, setHandsDetected]);

  const toggleHandsManually = () => {
    if (isRunning) {
      setHandsDetected(!handsDetected);
      setShowHandAnimation(!handsDetected);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-green-900/30 backdrop-blur-xl rounded-3xl border border-emerald-400/30 p-8 shadow-2xl shadow-emerald-500/20">
      {/* Tap Visualization */}
      <div className="relative bg-green-950/40 rounded-2xl p-8 mb-8 min-h-[450px] flex flex-col items-center justify-center border border-emerald-500/20 shadow-inner">
        {/* Background glow effect */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-1000 ${
          isRunning 
            ? handsDetected 
              ? 'bg-emerald-500/15 shadow-2xl shadow-emerald-500/30 animate-pulse-slow' 
              : 'bg-red-500/15 shadow-2xl shadow-red-500/30 animate-pulse-fast'
            : 'bg-emerald-500/5'
        }`} />
        
        {/* Tap Fixture */}
        <div className="relative z-10 mb-10">
          <div className="w-28 h-20 bg-gradient-to-b from-slate-200 to-slate-400 rounded-t-2xl relative shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-10 bg-gradient-to-b from-slate-300 to-slate-500 rounded-b-full shadow-lg" />
          </div>
          
          {/* Water Flow */}
          {isRunning && (
            <div className="relative">
              <div className={`water-stream ${handsDetected ? 'water-stream-controlled' : 'water-stream-waste'}`} />
              {!handsDetected && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-6">
                  {[...Array(5)].map((_, i) => (
                    <Droplet
                      key={i}
                      className="w-3 h-3 text-blue-400 absolute animate-bounce opacity-60"
                      style={{
                        left: `${(i - 2) * 8}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hand Detection Area */}
        <div 
          className={`relative cursor-pointer transition-all duration-500 group ${
            showHandAnimation ? 'scale-110 animate-bounce-subtle' : 'scale-100'
          }`}
          onClick={toggleHandsManually}
        >
          <div className={`w-36 h-28 rounded-2xl border-2 border-dashed transition-all duration-500 ${
            handsDetected 
              ? 'border-emerald-400 bg-emerald-500/25 shadow-2xl shadow-emerald-500/40 animate-pulse-glow' 
              : 'border-emerald-600/50 bg-emerald-500/10 group-hover:border-emerald-500/70 group-hover:bg-emerald-500/15'
          } backdrop-blur-sm`}>
            <div className="flex items-center justify-center h-full">
              {showHandAnimation ? (
                <div className="relative">
                  <div className={`absolute inset-0 blur-lg ${handsDetected ? 'bg-emerald-400/30' : 'bg-gray-400/30'} rounded-full`} />
                  <Hand className={`w-10 h-10 transition-colors duration-300 relative z-10 ${
                    handsDetected ? 'text-emerald-300 drop-shadow-lg' : 'text-gray-400'
                  } animate-pulse`} />
                </div>
              ) : (
                <div className="text-center">
                  <Hand className="w-8 h-8 text-emerald-500/70 mx-auto mb-2 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-xs text-emerald-300/70 group-hover:text-emerald-200 transition-colors font-medium">Click to simulate hands</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Water Counter */}
        <div className="mt-10 text-center">
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 backdrop-blur-sm ${
            isRunning 
              ? handsDetected 
                ? 'bg-emerald-500/25 text-emerald-300 shadow-2xl shadow-emerald-500/30 border border-emerald-400/30' 
                : 'bg-red-500/25 text-red-300 shadow-2xl shadow-red-500/30 border border-red-400/30 animate-pulse-warning'
              : 'bg-emerald-500/10 text-emerald-400/70 border border-emerald-500/20'
          }`}>
            <Droplet className="w-6 h-6 drop-shadow-lg" />
            <span className="text-3xl font-mono font-bold drop-shadow-lg">
              {waterWasted.toFixed(1)}L
            </span>
            <span className="text-sm opacity-80 font-medium">wasted</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-6">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 font-semibold"
          >
            <Play className="w-6 h-6 drop-shadow-lg" />
            <span>Start Simulation</span>
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 font-semibold"
          >
            <Pause className="w-6 h-6 drop-shadow-lg" />
            <span>Stop</span>
          </button>
        )}
        
        <button
          onClick={onReset}
          className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-slate-500/30 hover:shadow-2xl hover:shadow-slate-500/40 font-semibold"
        >
          <RotateCcw className="w-6 h-6 drop-shadow-lg" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default TapSimulation;